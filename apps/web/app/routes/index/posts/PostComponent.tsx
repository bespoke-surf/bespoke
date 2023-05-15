import { Link } from "@remix-run/react";
import { Box } from "gestalt";
import { useMemo } from "react";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import { PostState } from "~/graphql/__generated__/graphql";
import ListPost from "./postComponent/ListPost";

const PostComponent = ({ data }: { data: PostFragment }) => {
  const navigationLink = useMemo(
    () =>
      data.postState === PostState.Published
        ? `/p/${data.postHandle}`
        : `/post/${data?.id}`,
    [data?.id, data.postHandle, data.postState]
  );

  return (
    <Box paddingX={2}>
      <Link to={navigationLink} prefetch="intent">
        <ListPost post={data} />
      </Link>
    </Box>
  );
};

export default PostComponent;
