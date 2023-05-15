import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  SelectList,
  Spinner,
  TextField,
} from "gestalt";
import { useCallback, useMemo } from "react";
import type { RootData } from "~/root";

import { json, redirect } from "@remix-run/node";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { AddFormData } from "./types";
import { AddSignupFormActionEnum, AddSignupFormSchema } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Add Signup Form | ${rootData.store?.name}`,
    description: "Add new Signup Form",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetLists({ subdomain }, { request }),
  ]);

  const list = response[0];

  return json<AddFormData>({
    list: list.getLists,
  });
}

export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();
    const action = formData.get("_action") as string;

    if (action === AddSignupFormActionEnum.addSignupForm) {
      const name = formData.get("name") as string;
      const listId = formData.get("listId") as string;
      const storeId = formData.get("storeId") as string;

      const data = await sdk.CreateSignupForm(
        {
          input: {
            listId,
            name,
            storeId,
          },
        },
        { request }
      );
      const id = data.createSignupForm?.id;

      return redirect(`/signup-forms/${id}`);
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const HEADER_ZINDEX = new FixedZIndex(100);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

interface MyFormValues {
  name: string;
  listId: string;
}

export default function AddForm() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();
  const loaderData = useLoaderData<AddFormData>();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const navigate = useNavigate();

  const listOptions = useMemo(
    () =>
      loaderData.list?.map((list) => (
        <SelectList.Option label={list.name} value={list.id} key={list.id} />
      )),
    [loaderData.list]
  );

  const handleAdd = useCallback(
    (values: MyFormValues) => {
      if (!rootLoaderData?.store?.about?.about || !rootLoaderData.store.name)
        return;
      const formData = new FormData();
      formData.append("_action", AddSignupFormActionEnum.addSignupForm);
      formData.append("storeId", rootLoaderData.store.id);
      formData.append("name", values.name);
      formData.append("listId", values.listId);
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, rootLoaderData]
  );

  const formik = useFormik<MyFormValues>({
    initialValues: { name: "", listId: "" },
    onSubmit: handleAdd,
    validationSchema: AddSignupFormSchema,
  });

  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Create new Signup Form"
        align="start"
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
        size="sm"
        closeOnOutsideClick
      >
        <Box paddingY={0} paddingX={0}>
          <Flex direction="column" gap={2}>
            <Flex direction="column" gap={6}>
              <TextField
                id="name"
                onChange={({ event }) => formik.handleChange(event)}
                onBlur={({ event }) => formik.handleBlur(event)}
                name="name"
                value={formik.values.name}
                label="Name"
                placeholder="Signup form name"
                size="lg"
                errorMessage={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
              />
              <SelectList
                id="listId"
                name="listId"
                value={formik.values.listId}
                onChange={({ event }) => formik.handleChange(event)}
                placeholder="Select a list"
                size="lg"
                label="Select a list"
                errorMessage={
                  formik.touched.listId && formik.errors.listId
                    ? formik.errors.listId
                    : undefined
                }
              >
                {listOptions}
              </SelectList>
            </Flex>
          </Flex>
        </Box>
      </Modal>
    </Layer>
  );
}
