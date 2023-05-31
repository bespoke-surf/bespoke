import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { load } from "cheerio";
import { FormikProvider, useFormik } from "formik";
import { Box, Layer, Sticky } from "gestalt";
import { useCallback } from "react";
import { getEnvVars } from "../../../env.server";
import type {
  SignupFormData,
  SignupFormDataInput,
} from "../../graphql/__generated__/graphql";
import { SignupFormState } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import {
  signuFromModuleJs,
  signupFormScriptJS,
} from "../../utils/signupForms.server";
import { isPrivateRoute } from "../../utils/utils.server";
import { FormEditor } from "./FormEditor";
import { SuccessEditor } from "./SuccessEditor";
import { TopBar } from "./TopBar";
import type { SingupFormIdLoaderData } from "./types";
import {
  FormZindex,
  SignupFormActionEnum,
  UpdateSignpFormSchema,
} from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export const meta: MetaFunction = ({ parentsData, data }) => {
  const rootData = parentsData.root as RootData;
  const currentData = data as SingupFormIdLoaderData;

  return {
    title: `${currentData.signupForm?.name ?? "Untitled"} | ${
      rootData.store?.name
    }`,
    description: "Shop using credits for signup form, email templates etc...",
  };
};

export async function loader({ request, params }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const signupFormId = params.signupFormId;

  if (!signupFormId) {
    return redirect("/signup-forms");
  }

  const signupForm = await sdk.GetSignupForm(
    {
      signupFormId,
    },
    { request }
  );

  return json<SingupFormIdLoaderData>({
    signupForm: signupForm.getSignupForm,
  });
}

export interface MyFromValue {
  name: string;
  formState: string;
  form?: SignupFormData | null | undefined;
  success?: SignupFormData | null | undefined;
  formType: "success" | "form";
  boxHeight: number | string | undefined;
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const signupFormId = params.signupFormId;

  if (!signupFormId) return null;

  const action = formData.get("_action") as string;

  if (action === SignupFormActionEnum.updateSignpForm) {
    const formState = formData.get("formState") as SignupFormState;
    const name = formData.get("name") as string;
    const form = formData.get("form") as string;
    const success = formData.get("success") as string;
    const storeId = formData.get("storeId") as string;
    const parsedForm = JSON.parse(form) as SignupFormDataInput;
    const parsedSuccess = JSON.parse(success);

    const $form = load(parsedForm.html);
    $form("form").attr(
      "onsubmit",
      `parent.handleBespokeOnSiteFormSubmition${signupFormId.replace(
        /-/g,
        ""
      )}(event)`
    );
    const $success = load(parsedSuccess.html);

    const regex =
      /document\.querySelector\(\s*'\.u-popup-container'\s*\)\s*\.style\.display\s*=\s*'none';/g;
    const close = `parent.handleBespokeOnSiteCloseModal${signupFormId.replace(
      /-/g,
      ""
    )}(event)`;
    const key = "bespokeOnSite";

    sdk.UpdateSignupForm(
      {
        input: {
          signupFormId,
          formState,
          form: {
            ...parsedForm,
            html: $form.html().replace(regex, close),
          },
          success: {
            ...parsedSuccess,
            html: $success.html().replace(regex, close),
          },
          scriptJavascript: signupFormScriptJS({
            formId: signupFormId,
            successFormId: `${signupFormId}-success`,
            key,
            backendHost: getEnvVars().BACKEND_HOST,
            storeId,
          }),
          scriptModule: signuFromModuleJs(signupFormId, key),
          name,
        },
      },
      { request }
    );
  }

  return null;
}

export default function SignupForm() {
  const submit = useSubmit();
  const rootLoader = useRouteLoaderData("root") as RootData;

  const loaderData = useLoaderData<typeof loader>();

  const handleSubmit = useCallback(
    (value: MyFromValue) => {
      if (!rootLoader.store?.id) return;
      const stringifiedForm = JSON.stringify(value.form);
      const strigifiedSuccess = JSON.stringify(value.success);
      const formData = new FormData();
      formData.append("_action", SignupFormActionEnum.updateSignpForm);
      formData.append("name", value.name);
      formData.append("formState", value.formState);
      formData.append("form", stringifiedForm);
      formData.append("success", strigifiedSuccess);
      formData.append("storeId", rootLoader.store.id);
      submit(formData, { method: "post" });
    },
    [submit, rootLoader.store?.id]
  );

  const formik = useFormik<MyFromValue>({
    initialValues: {
      name: loaderData.signupForm?.name ?? "",
      formState: loaderData.signupForm?.formState ?? SignupFormState.Draft,
      form: loaderData.signupForm?.form,
      success: loaderData.signupForm?.success,
      formType: "form",
      boxHeight: undefined,
    },
    onSubmit: handleSubmit,
    validationSchema: UpdateSignpFormSchema,
  });

  return (
    <Layer zIndex={FormZindex}>
      <Box
        position="absolute"
        top
        bottom
        left
        right
        height="100vh"
        color="light"
      >
        <FormikProvider value={formik}>
          <Sticky top={0}>
            <TopBar />
          </Sticky>
          <FormEditor />
          <SuccessEditor />
        </FormikProvider>
      </Box>
    </Layer>
  );
}
