import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import { withYup } from "@remix-validated-form/with-yup";
import coreStyle from "@uppy/core/dist/style.css";
import dashboardStyle from "@uppy/dashboard/dist/style.css";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  SlimBanner,
  Spinner,
} from "gestalt";
import { useCallback } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import MappedAttributes from "./MappedAttributes";
import type { AddSubscriberFormValues } from "./types";
import { AddSubscribersActionEnum, AddSubscribersSchema } from "./types";
import UploadComponent from "./UploadComponent";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData, params }) => {
  const listName = params.listName;
  const rootData = parentsData.root as RootData;

  return {
    title: `Add Subscribers - ${listName}  | ${rootData.store?.name}`,
    description: "Add subscriber to this list",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: coreStyle,
    },
    {
      rel: "stylesheet",
      href: dashboardStyle,
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return null;
}

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();

  const listId = params.listId as string;
  const listName = params.listName as string;
  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  if (!listId) return redirect(`/subscriber-lists`);

  const action = formData.get("_action") as string;

  if (action === AddSubscribersActionEnum.addCommaSeperatedEmailsToList) {
    const validator = withYup(AddSubscribersSchema.pick(["csEmails"]));
    const result = await validator.validate(formData);
    if (result.error) {
      return null;
    }

    const storeId = formData.get("storeId") as string;
    const emails = formData.get("csEmails") as string;
    const data = await sdk.AddCommaSeperatedEmailsToList(
      {
        input: {
          emails,
          listId,
          storeId,
        },
      },
      { request }
    );
    if (data?.addCommaSeperatedEmailsToList) {
      return redirect(`/subscriber-lists/${listName}/${listId}`);
    }
  }
  if (action === AddSubscribersActionEnum.uploadCsvEmailsToList) {
    const validator = withYup(AddSubscribersSchema.pick(["csvFileEmails"]));
    const result = await validator.validate(formData);
    if (result.error) {
      return null;
    }
    const csvFileEmails = formData.get("csvFileEmails") as string;
    await sdk.UploadCsvFileEmailsToList(
      {
        input: {
          listId,
          csvFileEmails: JSON.parse(csvFileEmails),
          subdomain,
        },
      },
      { request }
    );
    return redirect(`/subscriber-lists/${listName}/${listId}`);
  }

  return null;
}

const HEADER_ZINDEX = new FixedZIndex(100);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function AddSubscribers() {
  const rootData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (values: AddSubscriberFormValues) => {
      if (!rootData?.store?.id) return;
      const formData = new FormData();
      if (values.aborted == undefined) {
        formData.append("csEmails", values.csEmails);
        formData.append("storeId", rootData.store.id);
        formData.append(
          "_action",
          AddSubscribersActionEnum.addCommaSeperatedEmailsToList
        );
      } else {
        const { mappedFields, parsedResults } = values;
        const csvData: {
          email: string;
          firstName?: string;
          lastName?: string;
        }[] = [];
        if (mappedFields) {
          for (const result of parsedResults) {
            let email,
              firstName,
              lastName = undefined;
            for (const fields of mappedFields) {
              if (!fields.checked) continue;
              if (fields.value === "Email") {
                email = result[fields.key];
              }
              if (fields.value === "First Name") {
                firstName = result[fields.key];
              }
              if (fields.value === "Last Name") {
                lastName = result[fields.key];
              }
            }
            if (email) {
              csvData.push({
                email,
                firstName,
                lastName,
              });
            }
          }
        }
        formData.append("csvFileEmails", JSON.stringify(csvData));
        formData.append(
          "_action",
          AddSubscribersActionEnum.uploadCsvEmailsToList
        );
      }
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, rootData?.store?.id]
  );

  const formik = useFormik<AddSubscriberFormValues>({
    initialValues: {
      csvFileEmails: [],
      csEmails: "",
      uploadErrors: [],
      aborted: undefined,
      parsedResults: [],
      mappedFields: [],
    },
    onSubmit: handleSubmit,
    validationSchema: AddSubscribersSchema,
  });

  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Add Subscribers by email"
        align="center"
        subHeading="Subscribers who have explicitly opted in to receive marketing from you"
        onDismiss={loading ? () => undefined : () => goBack()}
        footer={
          <>
            {loading ? (
              <Flex justifyContent="end">
                <Spinner accessibilityLabel="loading" show />
              </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Button
                  color="gray"
                  text="Close"
                  onClick={goBack}
                  size="lg"
                  disabled={loading}
                />
                <Button
                  color="red"
                  text="Add"
                  disabled={loading}
                  onClick={() => formik.handleSubmit()}
                  size="lg"
                />
              </Flex>
            )}
          </>
        }
        size="md"
        closeOnOutsideClick
      >
        <FormikProvider value={formik}>
          {formik.values.aborted === false ? (
            <MappedAttributes />
          ) : (
            <UploadComponent />
          )}
          <Flex direction="column" gap={2}>
            {formik.values.aborted &&
              formik.values.uploadErrors.map(({ code, message }) => (
                <SlimBanner
                  key={code}
                  message={message}
                  type="warningBare"
                  iconAccessibilityLabel="warning"
                />
              ))}
            <Box />
          </Flex>
        </FormikProvider>
      </Modal>
    </Layer>
  );
}
