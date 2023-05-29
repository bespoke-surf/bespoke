import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { DropdownOption } from "gestalt";
import {
  Box,
  Button,
  Callout,
  Container,
  Datapoint,
  Dropdown,
  Flex,
  Icon,
  IconButton,
  PageHeader,
  Table,
  Text,
} from "gestalt";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCallback, useMemo, useRef, useState } from "react";
import type { ListFragment } from "~/graphql/__generated__/graphql";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import type { ListData } from "./types";
import { ListActionEnum } from "./types";

import type { ActionArgs } from "@remix-run/node";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { TapArea } from "gestalt";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { calculateLocalTime } from "../../utils/calculateLocalTime";
dayjs.extend(LocalizedFormat);
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Lists | ${rootData.store?.name}`,
    description:
      "Each subscribers belong to a list. Create a list to add subscribers.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetLists(
      {
        subdomain,
      },
      {
        request,
      }
    ),
  ]);

  const lists = response[0];

  return json<ListData>({
    lists: lists.getLists,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === ListActionEnum.deleteList) {
    const listId = formData.get("listId") as string;

    await sdk.DeleteList(
      {
        listId,
      },
      {
        request,
      }
    );
  }

  if (action === ListActionEnum.toggleStarList) {
    const listId = formData.get("listId") as string;
    await sdk.ToggleListStar(
      {
        listId,
      },
      {
        request,
      }
    );
  }

  return null;
}

export default function Subscribers() {
  const navigate = useNavigate();
  const location = useLocation();
  const loaderData = useLoaderData<ListData>();

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            {location.pathname === "/subscriber-lists" ||
            location.pathname === "/subscriber-lists/create-list" ? (
              <>
                <PageHeader
                  borderStyle="none"
                  title="LISTS & SEGMENTS"
                  subtext="(Segmentation is coming soon)"
                  items={[
                    <Datapoint
                      key="revenue"
                      size="md"
                      title="All lists"
                      value={`${loaderData.lists?.length}` ?? "0"}
                    />,
                  ]}
                  primaryAction={{
                    component: (
                      <Button
                        color="red"
                        size="lg"
                        text="Create"
                        type="button"
                        href="/subscriber-lists/create-list"
                        role="link"
                      />
                    ),
                    dropdownItems: [
                      <Dropdown.Item
                        onSelect={() => navigate("create-list")}
                        key="create"
                        option={{ label: "Create", value: "create" }}
                      />,
                    ],
                  }}
                />
                <Flex justifyContent="center">
                  <Box width="92.5%" paddingY={6}>
                    {loaderData.lists?.length === 0 ||
                    loaderData.lists === null ||
                    loaderData.lists === undefined ? (
                      <Callout
                        iconAccessibilityLabel="warning"
                        title="Lists table is empty!"
                        key="add subs"
                        type="warning"
                        message="You haven't created any lists."
                        primaryAction={{
                          label: "Create",
                          accessibilityLabel: "create",
                          href: "/subscriber-lists/create-list",
                          target: "self",
                        }}
                      />
                    ) : (
                      <ListTable />
                    )}
                  </Box>
                </Flex>
              </>
            ) : null}
            <Outlet />
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}

const ListTable = () => {
  const loaderData = useLoaderData<ListData>();

  const lists = useMemo(
    () =>
      loaderData.lists?.map((list) => (
        <ListRow
          //@ts-ignore
          list={list}
          key={list.id}
        />
      )),
    [loaderData.lists]
  );

  return (
    <Box>
      <Table accessibilityLabel="Sticky Column" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">List</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Subscribers</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Created</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{lists}</Table.Body>
      </Table>
    </Box>
  );
};

const ListRow = ({ list }: { list: ListFragment }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [starred, setStar] = useState(list.starred);

  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const deleteList = useCallback(() => {
    if (loading) return;
    const formData = new FormData();

    formData.append("_action", ListActionEnum.deleteList);
    formData.append("listId", list.id);
    fetcher.submit(formData, {
      method: "delete",
    });
  }, [fetcher, list.id, loading]);

  const toggleStarList = useCallback(() => {
    if (loading) return;
    setStar(!starred);
    const formData = new FormData();
    formData.append("_action", ListActionEnum.toggleStarList);
    formData.append("listId", list.id);
    fetcher.submit(formData, {
      method: "post",
    });
  }, [fetcher, list.id, loading, starred]);

  const handleAddOrShow = useCallback(
    ({ item }: { item: DropdownOption }) => {
      if (item.value === "add-subscriber") {
        navigate(`Newsletter/${list.id}/add-subscribers`);
      }
      if (item.value === "show-subscribers") {
        navigate(`Newsletter/${list.id}`);
      }
    },
    [list.id, navigate]
  );

  return (
    <>
      <Table.Row key={list.id}>
        <Table.Cell>
          <Flex gap={2} alignItems="center">
            <Link to={`${list.name}/${list.id}`} prefetch="intent">
              <Text underline>{list.name}</Text>
            </Link>
            <TapArea onTap={toggleStarList}>
              <Icon
                accessibilityLabel="star"
                icon="star"
                color={starred ? "warning" : "subtle"}
              />
            </TapArea>
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Text>{list.members}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{calculateLocalTime(list.createdAt, "ll")}</Text>
        </Table.Cell>

        <Table.Cell>
          <IconButton
            icon="ellipsis"
            onClick={() => setOpen((s) => !s)}
            accessibilityLabel="ellipsis"
            ref={anchorRef}
          />
        </Table.Cell>
      </Table.Row>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="truncation-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={handleAddOrShow}
            option={{
              value: "show-subscribers",
              label: "Show subscribers",
            }}
          />

          <Dropdown.Section label="Quick">
            <Dropdown.Item
              onSelect={handleAddOrShow}
              option={{
                value: "add-subscriber",
                label: "Add subscribers",
              }}
            />
            <Dropdown.Item
              onSelect={deleteList}
              option={{
                value: "delete",
                label: "Delete",
              }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </>
  );
};
