import type {
  BillingFragment,
  SignupFormFragment,
} from "~/graphql/__generated__/graphql";

export enum SignupFormActionEnum {
  deleteForm = "deleteForm",
}

export interface SignupFormsData {
  forms: SignupFormFragment[] | null | undefined;
  billing: BillingFragment | null | undefined;
}
