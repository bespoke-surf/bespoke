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
} from "gestalt";
import { useCallback, useMemo } from "react";
import type { RootData } from "~/root";

import { json, redirect } from "@remix-run/node";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { AddSignupFormItemSchema } from "./type";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Add Signup Form - Folder | ${rootData.store?.name}`,
    description: "Add this signup form",
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

  let headers = new Headers();

  return json(
    {
      list: list.getLists,
    },
    { headers }
  );
}

export async function action({ request, params }: ActionArgs) {
  try {
    const formData = await request.formData();

    const itemId = params.itemId as string;
    const listId = formData.get("listId") as string;
    const storeId = formData.get("storeId") as string;

    const data = await sdk.AddSignupFormItem(
      {
        input: {
          itemId,
          listId,
          storeId,
        },
      },
      { request }
    );
    if (data.addSignupFormItem) {
      return redirect(`/signup-forms`);
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
  listId: string;
}

export default function AddForm() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();
  const loaderData = useLoaderData<typeof loader>();

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
      formData.append("storeId", rootLoaderData.store.id);
      formData.append("listId", values.listId);
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, rootLoaderData]
  );

  const formik = useFormik<MyFormValues>({
    initialValues: {
      listId: "",
    },
    onSubmit: handleAdd,
    validationSchema: AddSignupFormItemSchema,
  });

  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Add Signup form"
        role="dialog"
        heading="Add Signup Form"
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
