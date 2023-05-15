import { redirect } from "@remix-run/node";

import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Datapoint,
  Dropdown,
  Flex,
  Icon,
  PageHeader,
  Tabs,
  Text,
} from "gestalt";
import React, { useCallback, useMemo } from "react";
import type { RootData } from "~/root";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { PostFragment } from "../../graphql/__generated__/graphql";
import {
  getSubdomain,
  isPrivateRoute,
  isRouteOnUserSubdomain,
} from "../../utils/utils.server";
import PostComponent from "../index/posts/PostComponent";

export type DraftPosts = {
  drafts: PostFragment[] | null | undefined;
};

// used in index to show user his draft and unpusblished posts
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const isPrivate = await isPrivateRoute(request);
    if (isPrivate == false) {
      return redirect("/");
    }

    const isOnSubdomain = isRouteOnUserSubdomain(request);
    if (isOnSubdomain) {
      const subdomain = getSubdomain(request);
      if (typeof subdomain !== "string") return null;

      const response = await Promise.all([
        sdk.Me({}, { request, forbiddenRedirect: "/" }),
        sdk.GetDraftPosts({ subdomain }, { request }),
      ]);

      const drafts = response[1];

      return json<DraftPosts>({
        drafts: drafts.getDraftPosts,
      });
    }
    return null;
  } catch (err) {
    return null;
  }
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  if (action === "createPost") {
    const storeId = formData.get("storeId") as string;
    const post = await sdk.CreatePost(
      {
        input: {
          storeId,
          title: "",
        },
      },
      {
        request,
        forbiddenRedirect: "/",
      }
    );
    return redirect(`/post/${post.createPost?.id}`);
  }
  return null;
}

const Posts = () => {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<DraftPosts>();
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const renderDraftPosts = useMemo(
    () =>
      loaderData?.drafts?.map((post) => (
        <React.Fragment key={post.id}>
          <PostComponent key={post.id} data={post} />
        </React.Fragment>
      )),
    [loaderData.drafts]
  );
  const handleCreate = useCallback(() => {
    if (loading) return;
    if (!rootLoaderData?.store?.id) return;
    const formData = new FormData();
    formData.append("_action", "createPost");
    formData.append("storeId", rootLoaderData.store?.id);
    fetcher.submit(formData, { method: "post" });
  }, [loading, rootLoaderData.store?.id, fetcher]);

  return (
    <BigContainer>
      <Flex alignItems="start" justifyContent="center">
        <Naviagation />
        <Flex.Item flex="grow">
          {rootLoaderData?.isUserSubdomain && (
            <Box paddingX={2}>
              <Flex justifyContent="start" alignItems="center" gap={2}>
                <Link to="/tools">
                  <Text underline size="100">
                    Tools
                  </Text>
                </Link>

                <Icon
                  accessibilityLabel="arrow-right"
                  size={10}
                  icon="arrow-forward"
                  color="dark"
                />
                <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
                  <Text size="100">Newsletter</Text>
                </Box>
              </Flex>
            </Box>
          )}
          <PageHeader
            borderStyle="none"
            title="NEWSLETTER"
            items={[
              <Datapoint
                key="revenue"
                size="md"
                title="All drafts"
                value={`${loaderData.drafts?.length}` ?? "0"}
              />,
            ]}
            subtext={
              rootLoaderData?.isUserSubdomain
                ? "Write your newsletters and send to your audience. People can also see your published posts here."
                : undefined
            }
            helperLink={
              rootLoaderData.isUserSubdomain
                ? {
                    href: "/tools/public-profile",
                    accessibilityLabel: "how to view public website",
                    text: "See how to view my public website.",
                  }
                : undefined
            }
            primaryAction={
              rootLoaderData?.isUserSubdomain
                ? {
                    component: (
                      <Button
                        color="red"
                        size="lg"
                        text="Create"
                        type="button"
                        role="button"
                        onClick={handleCreate}
                        disabled={loading}
                      />
                    ),
                    dropdownItems: [
                      <Dropdown.Item
                        key="dropdown"
                        onSelect={handleCreate}
                        option={{ value: "create", label: "Create" }}
                      />,
                    ],
                  }
                : undefined
            }
          />

          <Flex justifyContent="center" flex="grow">
            <Box paddingY={6} width="94%">
              <Box marginBottom={8}>
                <Tabs
                  tabs={[
                    { href: "/", text: "New" },
                    {
                      href: "/drafts",
                      text: "Drafts & Unpublished",
                    },
                  ]}
                  activeTabIndex={1}
                  onChange={() => undefined}
                />
              </Box>
              {renderDraftPosts?.length === 0 && (
                <Callout
                  iconAccessibilityLabel="No post"
                  message="Create a post and save to display under drafts. Unpublished posts will also show up here."
                  type="warning"
                  title="Nothing's saved in Drafts & Unpublished"
                />
              )}
              {renderDraftPosts}
            </Box>
          </Flex>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
};

export default Posts;
