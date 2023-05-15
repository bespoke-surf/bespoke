import * as yup from "yup";

export const SubscribeSchema = yup.object().shape({
  storeId: yup.string().required(),
  _action: yup.string().required(),
  email: yup
    .string()
    .email("please enter a valid email")
    .required("please enter your email"),
});

export enum SubscribeActionEnum {
  subscribe = "subscribe",
}
