import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  Spinner,
  TextField,
} from "gestalt";
import { useCallback } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
import { CreateNewListSchema, CreateSubscriberListActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Create - List | ${rootData.store?.name}`,
    description: "Creatge a new list",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === CreateSubscriberListActionEnum.createList) {
    const storeId = formData.get("storeId") as string;
    const name = formData.get("name") as string;
    const list = await sdk.CreateNewList(
      {
        name,
        storeId,
      },
      {
        request,
      }
    );
    if (list.createNewList) {
      return redirect("/subscriber-lists");
    }
  }

  return null;
}

const HEADER_ZINDEX = new FixedZIndex(100);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function CreateList() {
  const rootData = useRouteLoaderData("root") as RootData;
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values: { name: string }) => {
      if (!rootData?.store?.id) return;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("storeId", rootData?.store.id);
      formData.append("_action", CreateSubscriberListActionEnum.createList);
      fetcher.submit(formData, { method: "post" });
    },
    validationSchema: CreateNewListSchema,
  });

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Create a list"
        onDismiss={goBack}
        footer={
          <>
            {!loading ? (
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Button color="gray" text="Close" onClick={goBack} size="lg" />
                <Button
                  color="red"
                  text="Create"
                  onClick={() => formik.handleSubmit()}
                  size="lg"
                  disabled={loading}
                />
              </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Spinner show accessibilityLabel="loading" />
              </Flex>
            )}
          </>
        }
        size="sm"
        closeOnOutsideClick
      >
        <Box paddingX={8} paddingY={1}>
          <TextField
            size="lg"
            id="name"
            name="name"
            label="List name"
            placeholder="Newsletter"
            autoComplete="off"
            onChange={({ event }) => formik.handleChange(event)}
            onBlur={({ event }) => formik.handleBlur(event)}
            type="text"
            value={formik.values.name}
            errorMessage={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
            onKeyDown={({ event }) => {
              if (event.key === "Enter") {
                formik.handleSubmit();
              }
            }}
          />
        </Box>
      </Modal>
    </Layer>
  );
}
