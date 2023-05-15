import * as yup from "yup";

export const AddSignupFormItemSchema = yup.object().shape({
  listId: yup.string().required("please listId "),
});
