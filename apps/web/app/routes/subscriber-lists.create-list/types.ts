import * as yup from "yup";

export enum CreateSubscriberListActionEnum {
  createList = "createList",
}

export const CreateNewListSchema = yup.object().shape({
  name: yup.string().required("please add a list name"),
});
