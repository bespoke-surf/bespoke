import type { EditorFormikValues } from "../../components/Editor";
import type { PostFragment } from "../../graphql/__generated__/graphql";

export interface PostByHandleValues extends EditorFormikValues {}

export type PostByHandleData = {
  post: PostFragment | null | undefined;
  morePosts: PostFragment[] | null | undefined;
};
