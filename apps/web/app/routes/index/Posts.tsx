import {
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Datapoint,
  Dropdown,
  Flex,
  PageHeader,
  Tabs,
} from "gestalt";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import type { RootData } from "~/root";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { PostFragment } from "../../graphql/__generated__/graphql";
import type { DraftPosts } from "../drafts";
import PostComponent from "./posts/PostComponent";
import type { IndexData } from "./types";
import { WAYPOINT_TRIGGER_AT } from "./types";

const Posts = ({ createPost }: { createPost: () => void }) => {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<IndexData>();
  const navigation = useNavigation();
  const fetcher = useFetcher<IndexData>();
  const draftFetch = useFetcher<DraftPosts>();
  const [searchParams] = useSearchParams();

  const loadingCreate =
    navigation.state === "loading" || navigation.state === "submitting";

  const isDraftRoute = searchParams.get("sort") === "drafts" ? true : false;

  const [items, setItems] = useState<PostFragment[]>(loaderData.posts ?? []);

  useEffect(() => {
    if (draftFetch.type === "init" && rootLoaderData?.isUserSubdomain) {
      draftFetch.load("/drafts");
    }
  }, [draftFetch, rootLoaderData?.isUserSubdomain]);

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      if (!inView) return;
      if (!isDraftRoute) {
        fetcher.load(`/?index&skip=${items.length}`);
      }
    },
    [fetcher, items?.length, isDraftRoute]
  );

  // useEffect(() => {

  //   if (draftFetch.type === "init" && rootLoaderData.isUserSubdomain) {
  //     draftFetch.load(`/draft`);
  //   }
  // }, [draftFetch.type, draftFetch.load, rootLoaderData.isUserSubdomain]);

  useEffect(() => {
    if (fetcher.data) {
      setItems((prevItems) => [...prevItems, ...(fetcher.data?.posts ?? [])]);
    }
  }, [fetcher.data, isDraftRoute]);

  const renderPosts = useMemo(
    () =>
      items?.map((post, index) => (
        <React.Fragment key={post.id}>
          <PostComponent key={post.id} data={post} />
          <ClientOnly>
            {() => (
              <>
                {index === items.length - WAYPOINT_TRIGGER_AT && (
                  <InView onChange={handleFetchMore} />
                )}
              </>
            )}
          </ClientOnly>
        </React.Fragment>
      )),
    [handleFetchMore, items]
  );

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <PageHeader
            borderStyle="none"
            title="NEWSLETTER"
            items={[
              <Datapoint
                key="revenue"
                size="md"
                title="All posts"
                value={`${loaderData.posts?.length}` ?? "0"}
              />,
            ]}
            subtext={
              rootLoaderData?.isUserSubdomain
                ? "Write your newsletters and send to your audience. People can also see your published posts here."
                : undefined
            }
            primaryAction={{
              component: rootLoaderData.isUserSubdomain ? (
                <Button
                  color="red"
                  size="lg"
                  text="Create"
                  type="button"
                  role="button"
                  onClick={createPost}
                  disabled={loadingCreate}
                />
              ) : (
                <Button
                  color="red"
                  size="lg"
                  text="Subscribe"
                  role="link"
                  href="/subscribe"
                />
              ),
              dropdownItems: rootLoaderData.isUserSubdomain
                ? [
                    <Dropdown.Item
                      key="dropdown"
                      onSelect={createPost}
                      option={{ value: "create", label: "Create" }}
                    />,
                  ]
                : [
                    <Dropdown.Link
                      key="dropdown"
                      href="/subscribe"
                      option={{
                        value: "subscribe",
                        label: "Subscribe",
                      }}
                    />,
                  ],
            }}
          />
          <Flex justifyContent="center" flex="grow">
            <Box paddingY={6} width="94%">
              {rootLoaderData?.isUserSubdomain && (
                <Box marginBottom={8}>
                  <Tabs
                    tabs={[
                      { href: "/", text: "New" },
                      {
                        href: "/drafts",
                        text: "Drafts & Unpublished",
                        indicator:
                          draftFetch.data?.drafts?.length !== undefined &&
                          draftFetch?.data?.drafts?.length > 0
                            ? "dot"
                            : undefined,
                      },
                    ]}
                    activeTabIndex={isDraftRoute ? 1 : 0}
                    onChange={() => undefined}
                  />
                </Box>
              )}

              {!renderPosts || renderPosts?.length === 0 ? (
                <Callout
                  iconAccessibilityLabel="No post"
                  message={
                    rootLoaderData?.isUserSubdomain
                      ? "You haven't published any post. For draft posts, click on the drafts & unpublished tab above."
                      : `${rootLoaderData?.store?.name} hasn't published anything.`
                  }
                  type="warning"
                  title="Nothing's published!"
                />
              ) : null}
              {renderPosts}
            </Box>
          </Flex>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
};

export default Posts;
