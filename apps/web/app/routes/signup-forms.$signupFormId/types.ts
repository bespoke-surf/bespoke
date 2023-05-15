import { CompositeZIndex, FixedZIndex } from "gestalt";
import * as yup from "yup";
import type { SignupFormFragment } from "../../graphql/__generated__/graphql";
import { SignupFormState } from "../../graphql/__generated__/graphql";

export interface SingupFormIdLoaderData {
  signupForm: SignupFormFragment | null | undefined;
}

export enum SignupFormActionEnum {
  updateSignpForm = "updateSignupForm",
}

const SignupForm = yup.object().shape({
  js: yup.string(),
  fonts: yup.string(),
  body: yup.string().required(),
  css: yup.string().required(),
  html: yup.string().required(),
  design: yup.string().required(),
});

export const UpdateSignpFormSchema = yup.object().shape({
  name: yup.string().required("please enter a name"),
  formState: yup
    .mixed<SignupFormState>()
    .oneOf(Object.values(SignupFormState), "")
    .required(""),
  form: SignupForm,
  success: SignupForm,
});

const HEADER_ZINDEX = new FixedZIndex(100);
export const FormZindex = new CompositeZIndex([HEADER_ZINDEX]);
