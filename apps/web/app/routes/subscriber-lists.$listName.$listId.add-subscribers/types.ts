import type { ParseError } from "papaparse";
import * as yup from "yup";
export interface AddSubscriberFormValues {
  csvFileEmails: {
    email: string;
    firstName?: string;
    lastName?: string;
  }[];
  csEmails: string;
  uploadErrors: ParseError[];
  aborted: undefined | boolean;
  parsedResults: any[];
  mappedFields:
    | {
        key: string;
        value: "Email" | "First Name" | "Last Name" | undefined;
        checked: boolean;
      }[]
    | undefined;
}

export enum AddSubscribersActionEnum {
  addCommaSeperatedEmailsToList = "addCommaSeperatedEmailsToList",
  uploadCsvEmailsToList = "uploadCsvEmailsToList",
}

const isEmpty = (str: string) => {
  if (typeof str === "string" && str.length === 0) {
    return true;
  } else {
    return false;
  }
};

const isEmailSchema = yup.string().email();

export const AddSubscribersSchema = yup.object().shape({
  aborted: yup.boolean().nullable(),
  mappedFields: yup.array().of(
    yup.object().shape({
      checked: yup.boolean(),
      key: yup.string(),
      value: yup.string().when("checked", {
        is: true,
        then: (schema) => schema.required("please select a field"),
      }),
    })
  ),
  csEmails: yup.string().when("aborted", {
    is: undefined,
    then: (schema) =>
      schema
        .test({
          name: "emails",
          test: function (value) {
            if (!value)
              return this.createError({ message: "The email is invalid" });
            const firstInvalidEmail = value
              .split(",")
              .map((email) => email.trim())
              .filter((v) => !isEmpty(v))
              .find((v) => !isEmailSchema.isValidSync(v));

            return !firstInvalidEmail
              ? true
              : this.createError({
                  message: `The email address '${firstInvalidEmail}' is invalid.`,
                });
          },
        })
        .required("add comma seperated emails or upload a CSV file"),
    otherwise: (schema) => schema.nullable(),
  }),
  csvFileEmails: yup
    .array()
    .of(
      yup.object().shape({
        email: yup.string().email().required(),
        firstName: yup.string(),
        lastName: yup.string(),
      })
    )
    .when("aborted", { is: false || true, then: (schema) => schema.min(1) }),
});
