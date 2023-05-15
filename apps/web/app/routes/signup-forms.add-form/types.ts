import * as yup from "yup";
import type { ListFragment } from "~/graphql/__generated__/graphql";

export interface AddFormData {
  list: ListFragment[] | null | undefined;
}

export enum AddSignupFormActionEnum {
  addSignupForm = "addSignupForm",
}
export const AddSignupFormSchema = yup.object().shape({
  listId: yup.string().required("please select a list"),
  name: yup.string().required("please add form name"),
});
