import * as yup from "yup";

export interface BusinessProfileSetting {
  name: string;
  about: string;
  subdomain: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state?: string;
  zipCode: string;
  stateCount?: number;
  senderName: string;
  senderEmail: string;
}
export enum SettingsBuisnessProfileActionEnum {
  checkNameAvailable = "checkNameAvailable",
  updateDisplayPicture = "updateDisplayPicture",
  updateStoreDeails = "updateStoreDetails",
}

export const BuseinssProfileSettingsSchema = yup.object().shape({
  name: yup.string().required("your business name"),
  about: yup.string().required("something about you business"),
  senderName: yup.string().required("please add a name"),
  senderEmail: yup
    .string()
    .email("please enter a valid email")
    .required("please add an email"),
  address1: yup.string().required("please add an address"),
  address2: yup.string(),
  city: yup.string().required("please add a city"),
  country: yup.string().required("please add a country"),
  state: yup.string().when("stateCount", {
    is: (value: number) => (value > 0 ? true : false),
    then: () => yup.string().required("please add a state"),
  }),
  zipCode: yup.string().required("please add a zip code"),
  stateCount: yup.number().required(),
  subdomain: yup
    .string()
    .matches(/^[a-z0-9]+$/g, "only letters and numbers")
    .required("your business URL"),
});
