import * as yup from "yup";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import type { GetImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";

export type IndexData = {
  posts: PostFragment[] | null | undefined;
  // showReader: boolean;
};

export const POST_TAKE = 10;
export const WAYPOINT_TRIGGER_AT = 5;

export enum IndexActionEnum {
  updateDisplayPicture = "updateDisplayPicture",
  createPost = "createPost",
  updateSubdomainPopup = "updateSubdomainPopup",
}

export const CreateNewPostSchema = yup.object().shape({
  title: yup.string(),
  subTitle: yup.string(),
  bodyHTML: yup.string(),
  bodyLexical: yup.string(),
});

export interface LandingPageComponentImages {
  images: Array<GetImageSrcAndSrcSet | null>;
}
