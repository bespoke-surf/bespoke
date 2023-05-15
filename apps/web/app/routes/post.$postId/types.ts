import * as yup from "yup";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import type { EditorFormikValues } from "../../components/Editor";

export interface PostFormValues extends EditorFormikValues {
  submitState: submitStateType;
  listId: string;
  handle: string;
}

export type submitStateType =
  | "save"
  | "emailBlast"
  | "publishToBespoke"
  | "unpublish";

export type PostActionData = {
  share: boolean;
};

export enum PostActionEnum {
  updatePost = "updatePost",
  deletePost = "deletePost",
  publishPostHere = "publishPostHere",
  publishPostToList = "publishPostToList",
  unpublish = "unpublish",
}

export type PostData = {
  post: PostFragment | null | undefined;
};

const requiredOnPublish = (message: string) =>
  yup.string().when("submitState", {
    is: (value: submitStateType) => {
      if (value === "emailBlast") return true;
      else if (value === "publishToBespoke") return true;
      return false;
    },
    then: () => {
      return yup.string().required(message);
    },
  });

export const UpdatePostSchema = yup.object().shape({
  title: requiredOnPublish("Please add a title"),
  subTitle: yup.string(),
  bodyHTML: requiredOnPublish(
    "Your post is empty. If it's not empty, please click the Save button. Autosave takes 2 seconds."
  ),
  bodyLexical: requiredOnPublish(
    "Your post is empty. If it's not empty, please click the Save button. Autosave takes 2 seconds."
  ),
  imageSrc: requiredOnPublish(
    "Please upload a header image before you publish"
  ),
  imageHeight: yup.number(),
  imageWidth: yup.number(),
  submitState: yup
    .string()
    .oneOf(["save", "emailBlast", "publishToBespoke", "unpublish"])
    .required("please select a method"),
  listId: yup.string().when("submitState", {
    is: (value: submitStateType) => value === "emailBlast",
    then: yup.string().required("Please select a list"),
  }),
});
