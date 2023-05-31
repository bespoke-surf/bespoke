import {
  Avatar,
  Box,
  Button,
  Callout,
  Datapoint,
  Dropdown,
  Flex,
  Icon,
  IconButton,
  PageHeader,
  Spinner,
  Table,
  Text,
} from "gestalt";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { FormikProvider, useFormik, useFormikContext } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import type { SubscriberListFragment } from "~/graphql/__generated__/graphql";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { calculateLocalTime } from "../../utils/calculateLocalTime";
import { isPrivateRoute } from "../../utils/utils.server";
import type { SubscriberListData } from "./types";
import { SubscriberListActionEnum } from "./types";

dayjs.extend(LocalizedFormat);
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ params, parentsData }) => {
  const listName = params.listName as string;
  const rootData = parentsData.root as RootData;

  return {
    title: `${listName} - Lists | ${rootData.store?.name} `,
    description:
      "Add subscribers manually with a csv file or use a Signup Form to add subscribers from your connected website.",
  };
};

export async function loader({ params, request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const listId = params.listId as string;

  if (!listId) return redirect("/subscriber-lists");

  const parsedUrl = new URL(request.url).searchParams;
  const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;

  // take = parsedUrl.query.skip ? Number(parsedUrl.query.skip) + 20 : take;

  try {
    const response = await Promise.all([
      sdk.GetSubscriberLists(
        {
          listId,
          skip,
          take: 20,
        },
        {
          request,
          forbiddenRedirect: "/",
        }
      ),
      sdk.GetSubscribersInListCount(
        { listId },
        { request, forbiddenRedirect: "/" }
      ),
    ]);
    const subscriberList = response[0];
    const listCount = response[1];

    return json<SubscriberListData>({
      subscriberList: subscriberList.getSubscriberLists,
      subscriberListCount: listCount.getSubscribersInListCount,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;
  const listId = params.listId as string;

  if (action === SubscriberListActionEnum.deleteSubscriberList) {
    const subscriberId = formData.get("subscriberId") as string;
    await sdk.RemoveSubscriberFromList(
      {
        listId,
        subscriberId,
      },
      {
        request,
      }
    );
  }

  return null;
}
interface MyFormValues {
  items: SubscriberListData["subscriberList"];
}

export default function SubscribersIndex() {
  const loaderData = useLoaderData() as SubscriberListData;
  const params = useParams<{ listName: string; listId: string }>();
  const navigate = useNavigate();
  const fetcher = useFetcher<SubscriberListData>();
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const formik = useFormik<MyFormValues>({
    enableReinitialize: true,
    initialValues: { items: loaderData.subscriberList ?? [] },
    onSubmit: () => undefined,
  });

  useEffect(() => {
    if (fetcher.data) {
      formik.setValues({
        items: [
          ...(formik.values.items ?? []),
          ...((fetcher.data
            ?.subscriberList as SubscriberListData["subscriberList"]) ?? []),
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      if (!inView) return;
      if (formik.values?.items?.length === loaderData.subscriberListCount)
        return;
      fetcher.load(
        `/subscriber-lists/${params.listName}/${params.listId}?skip=${formik.values.items?.length}`
      );
    },
    [
      formik.values.items?.length,
      loaderData.subscriberListCount,
      fetcher,
      params.listName,
      params.listId,
    ]
  );

  const subscriberList = useMemo(
    () =>
      formik.values.items?.map((subList, index) => (
        <React.Fragment key={subList.id}>
          <SubscriberListRow
            key={subList.id}
            //@ts-ignore
            subList={subList}
          />
          <ClientOnly>
            {() => (
              <>
                {index === (formik?.values?.items?.length ?? 0) - 5 && (
                  <InView onChange={handleFetchMore} />
                )}
              </>
            )}
          </ClientOnly>
        </React.Fragment>
      )),
    [formik.values.items, handleFetchMore]
  );

  return (
    <>
      <Box paddingX={2}>
        <Flex justifyContent="start" alignItems="center" gap={2}>
          <Link to="..">
            <Text underline size="100">
              Lists
            </Text>
          </Link>

          <Icon
            accessibilityLabel="arrow-right"
            size={10}
            icon="arrow-forward"
            color="dark"
          />
          <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
            <Text size="100">{params.listName}</Text>
          </Box>
        </Flex>
      </Box>
      <PageHeader
        borderStyle="none"
        title={params.listName ?? ""}
        subtext="Add subscribers manually with a csv file or use a Signup Form to add subscribers from your connected website."
        items={[
          <Datapoint
            key="revenue"
            size="md"
            title="Subscribers"
            value={`${loaderData.subscriberListCount}` ?? "0"}
          />,
        ]}
        primaryAction={{
          component: (
            <Button
              size="lg"
              text="Add"
              color="red"
              type="button"
              href={`/subscriber-lists/${params.listName}/${params.listId}/add-subscribers`}
              role="link"
            />
          ),
          dropdownItems: [
            <Dropdown.Item
              onSelect={() => navigate("add-subscribers")}
              key="add"
              option={{ label: "Add", value: "add" }}
            />,
          ],
        }}
      />
      <FormikProvider value={formik}>
        <Flex justifyContent="center">
          <Box width="92.5%" paddingY={6}>
            <Box display={subscriberList?.length === 0 ? "none" : "block"}>
              <Table accessibilityLabel="Sticky Column" stickyColumns={1}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Text weight="bold">Subscriber</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">Subscription Date</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>{subscriberList}</Table.Body>
              </Table>
            </Box>
            {subscriberList?.length === 0 ? (
              <Box>
                <Callout
                  iconAccessibilityLabel="warning"
                  title={`${params.listName} subscribers table is empty!`}
                  key="add subs"
                  type="warning"
                  message="You haven't added any subscribers."
                  primaryAction={{
                    label: "Add",
                    accessibilityLabel: "add",
                    href: `/subscriber-lists/${params.listName}/${params.listId}/add-subscribers`,
                    target: "self",
                  }}
                  secondaryAction={{
                    label: "Sync Customers",
                    accessibilityLabel: "sync",
                    href: "/integrations",
                    target: "self",
                  }}
                />
              </Box>
            ) : (
              <Box marginTop={2}>
                <Text>Showing {formik.values.items?.length}</Text>
              </Box>
            )}

            <Box
              marginTop={12}
              display={
                subscriberList?.length === 0
                  ? "none"
                  : loaderData.subscriberListCount ===
                    loaderData.subscriberList?.length
                  ? "none"
                  : "block"
              }
            >
              <Flex justifyContent="center" direction="column" gap={2}>
                {loading ? (
                  <Spinner show accessibilityLabel="loading" />
                ) : (
                  <Box />
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Outlet />
      </FormikProvider>
    </>
  );
}

const SubscriberListRow = ({
  subList,
}: {
  subList: SubscriberListFragment;
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const navigation = useNavigation();

  const submit = useSubmit();

  const { values, setValues } = useFormikContext<MyFormValues>();

  const loading =
    (navigation.state === "loading" || navigation.state === "submitting") &&
    navigation.formData?.get("subscriberId") === subList.subscriberId;

  const deleteList = useCallback(() => {
    if (loading) return;
    const formData = new FormData();
    formData.append("_action", SubscriberListActionEnum.deleteSubscriberList);
    formData.append("subscriberId", subList.subscriberId);
    submit(formData, {
      method: "delete",
    });
    const updatedItem = values.items?.filter(
      ({ subscriberId }) => subscriberId !== subList.subscriberId
    );
    setValues({
      items: updatedItem,
    });
  }, [loading, setValues, subList.subscriberId, submit, values.items]);

  const handleShowMoreDetails = useCallback(() => {
    navigate(`/subscribers/${subList.subscriber.id}`);
  }, [navigate, subList.subscriber.id]);

  return (
    <Table.Row key={subList.id}>
      <Table.Cell>
        <Flex alignItems="center" gap={2}>
          <Avatar size="sm" name={subList.subscriber.user.email} />
          <Link to={`/subscribers/${subList.subscriber.id}`}>
            <Text color={loading ? "subtle" : "dark"} underline>
              {subList.subscriber.user.email}
            </Text>
          </Link>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text>{calculateLocalTime(subList.createdAt, "ll")}</Text>
      </Table.Cell>
      <Table.Cell>
        {loading ? (
          <Spinner accessibilityLabel="loading" show />
        ) : (
          <>
            <IconButton
              icon="ellipsis"
              onClick={() => setOpen((s) => !s)}
              accessibilityLabel="ellipsis"
              ref={anchorRef}
            />

            {open && (
              <Dropdown
                anchor={anchorRef.current}
                id="truncation-dropdown-example"
                onDismiss={() => setOpen(false)}
              >
                <Dropdown.Item
                  onSelect={handleShowMoreDetails}
                  option={{
                    value: "details",
                    label: "Subscriber details",
                  }}
                />

                <Dropdown.Section label="Quick">
                  <Dropdown.Item
                    onSelect={deleteList}
                    option={{
                      value: "remove",
                      label: "Remove from list",
                    }}
                  />
                </Dropdown.Section>
              </Dropdown>
            )}
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
