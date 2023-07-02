import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Avatar,
  Box,
  Callout,
  Container,
  Datapoint,
  Flex,
  Heading,
  PageHeader,
  SearchField,
  Spinner,
  Table,
  Text,
} from "gestalt";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";

import {
  Link,
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useLocation,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import type { SubscriberFragment } from "~/graphql/__generated__/graphql";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { useDebounce } from "~/hooks/useDebounce";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { calculateTimeWhile } from "../../utils/calculateTimeWhile";
import type { SubscribersActionData, SubscribersData } from "./types";
import { SubscribersActionEnum } from "./types";
dayjs.extend(LocalizedFormat);
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Subscribers | ${rootData.store?.name}`,
    description: "All of your subscribers from across all of your lists.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const parsedUrl = new URL(request.url).searchParams;
  const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;

  const response = await Promise.all([
    sdk.GetSubscribers(
      {
        subdomain,
        skip,
        take: 10,
      },
      { request, forbiddenRedirect: "/" }
    ),
    sdk.GetSubscribersCount(
      {
        subdomain,
      },
      { request, forbiddenRedirect: "/" }
    ),
  ]);

  const subscribers = response[0];
  const count = response[1];

  return json<SubscribersData>({
    subscribers: subscribers.getSubscribers,
    subscribersCount: count.getSubscribersCount,
  });
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");
  const action = formData.get("_action");

  if (action === SubscribersActionEnum.searchForSubscribers) {
    const searchString = formData.get("searchString") as string;
    const data = await sdk.SearchSubscribers(
      {
        searchString,
        subdomain,
      },
      {
        request,
      }
    );

    return json<SubscribersActionData>({
      searchedSubscribers: data.searchSubscribers,
    });
  }
  return { message: "hello" };
}

export default function Profiles() {
  const location = useLocation();
  const loaderData = useLoaderData<SubscribersData>();
  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            {location.pathname === "/subscribers" ? (
              <>
                <PageHeader
                  borderStyle="none"
                  title="SUBSCRIBERS"
                  items={[
                    <Datapoint
                      key="revenue"
                      size="md"
                      title="All subscribers"
                      value={`${loaderData.subscribersCount}` ?? "0"}
                    />,
                  ]}
                />
                <Flex justifyContent="center">
                  <Box width="92.5%" paddingY={6}>
                    {loaderData.subscribers?.length === 0 ? (
                      <Box>
                        <Callout
                          iconAccessibilityLabel="warning"
                          title="All Subscribers"
                          key="add subs"
                          type="warning"
                          message="All subscribers from across all of your lists will show up here. Quickly sync with integrations."
                          primaryAction={{
                            label: "Sync Subscribers",
                            accessibilityLabel: "sync subscribers",
                            href: "/integrations",
                            target: "self",
                          }}
                        />
                      </Box>
                    ) : (
                      <ProfileTable />
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

const ProfileTable = () => {
  const loaderData = useLoaderData<SubscribersData>();
  const submit = useSubmit();
  const transition = useTransition();
  const [searchString, setSearchString] = useState("");
  const actionData = useActionData<SubscribersActionData>();

  const fetcher = useFetcher<SubscribersData>();
  const [items, setItems] = useState<(typeof loaderData)["subscribers"]>(
    loaderData.subscribers ?? []
  );

  const loadingSearch =
    (transition.submission?.formData.get("_action") ===
      SubscribersActionEnum.searchForSubscribers &&
      transition.state === "loading") ||
    (transition.submission?.formData.get("_action") ===
      SubscribersActionEnum.searchForSubscribers &&
      transition.state === "submitting");

  const loadingMore =
    fetcher.state === "loading" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      setItems((prevData) => [
        ...(prevData ?? []),
        ...(fetcher.data?.subscribers ?? []),
      ]);
    }
  }, [fetcher.data]);

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      if (!inView) return;
      if (items?.length === loaderData.subscribersCount) return;
      fetcher.load(`/subscribers?skip=${items?.length}`);
    },
    [fetcher, items?.length, loaderData.subscribersCount]
  );

  const profiles = useMemo(
    () =>
      items?.map((profile, index) => (
        <React.Fragment key={profile.id}>
          <ProfileRow
            //@ts-ignore
            subscriber={profile}
            key={profile.id}
          />

          <ClientOnly>
            {() => (
              <>
                {index === items?.length - 5 && (
                  <InView onChange={handleFetchMore} />
                )}
              </>
            )}
          </ClientOnly>
        </React.Fragment>
      )),
    [handleFetchMore, items]
  );

  const searchData = useMemo(
    () =>
      actionData?.searchedSubscribers?.map((profile) => (
        <ProfileRow
          //@ts-ignore
          subscriber={profile}
          key={profile.id}
        />
      )),
    [actionData?.searchedSubscribers]
  );

  const debounceSearchString = useDebounce(searchString, 1000);

  useEffect(() => {
    if (debounceSearchString) {
      const formData = new FormData();
      formData.append("_action", SubscribersActionEnum.searchForSubscribers);
      formData.append("searchString", debounceSearchString);
      submit(formData, { method: "post" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchString]);

  return (
    <Box>
      <Box marginBottom={4}>
        <Heading size="300">
          {searchString === "" || !actionData?.searchedSubscribers ? null : ( // <>All Subscribers ({loaderData.subscribersCount})</>
            <>
              Search results{" "}
              {loadingSearch
                ? "(loading)"
                : actionData?.searchedSubscribers !== undefined
                ? `(${actionData?.searchedSubscribers?.length})`
                : ""}
            </>
          )}
        </Heading>
      </Box>
      <SearchField
        accessibilityLabel="Search all of Pinterest"
        accessibilityClearButtonLabel="Clear search field"
        id="searchFieldA11yExample"
        onChange={({ value }) => setSearchString(value)}
        placeholder="Search for subscribers by email eg: example@example.com"
        value={searchString}
        autoComplete="off"
        size="lg"
      />
      <Box marginTop={4} />
      {searchData?.length === 0 && searchString != "" ? (
        <Text align="center">No results found</Text>
      ) : (
        <Table accessibilityLabel="Sticky Column" stickyColumns={1}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Subscriber</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">First Active</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Last Active</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {searchString !== "" &&
          searchData?.length !== undefined &&
          searchData?.length > 0 ? (
            <Table.Body>{searchData}</Table.Body>
          ) : (
            <Table.Body>{profiles}</Table.Body>
          )}
        </Table>
      )}
      <Box marginTop={2}>
        <Text>Showing {items?.length}</Text>
      </Box>
      <Box
        display={
          loaderData.subscribers?.length === loaderData.subscribersCount
            ? "none"
            : loaderData.subscribers?.length === 0
            ? "none"
            : searchString !== ""
            ? "none"
            : "block"
        }
        marginTop={8}
        marginBottom={12}
      >
        <Flex justifyContent="center">
          <Spinner show={loadingMore} accessibilityLabel="loading" />
        </Flex>
      </Box>
    </Box>
  );
};

const ProfileRow = ({ subscriber }: { subscriber: SubscriberFragment }) => {
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Flex gap={2} alignItems="center">
            <Avatar
              name={subscriber.firstName ?? subscriber.user.email}
              size="sm"
            />
            <Link to={`${subscriber.id}`}>
              <Text underline>
                {subscriber?.firstName
                  ? `${subscriber.firstName} ${subscriber.lastName ?? ""}`
                  : subscriber.user.email}
              </Text>
            </Link>
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Text>{calculateTimeWhile(subscriber?.createdAt)}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{calculateTimeWhile(subscriber?.updatedAt)}</Text>
        </Table.Cell>
      </Table.Row>
    </>
  );
};
