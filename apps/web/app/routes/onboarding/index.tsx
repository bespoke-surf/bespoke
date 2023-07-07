import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import type { FormikConfig, FormikHelpers } from "formik";
import { Formik } from "formik";
import { Box, Button, Container, Flex } from "gestalt";
import React, { useCallback, useState } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { validateForm } from "~/utils/validateForm.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import Finish from "./Finish";
import Hello from "./Hello";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import type { IOnboardingFormValues, OnboardingData } from "./types";
import {
  ActionEnum,
  HelloSchema,
  Page1Schema,
  Page2Schema,
  Page3Schema,
} from "./types";

import playgourndCss from "@bespoke/common/dist/index.css";
import { links as editorLinks } from "../../components/Editor";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
import { redirectToSubdomain } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export const links: LinksFunction = () => {
  return [
    ...editorLinks(),
    {
      rel: "stylesheet",
      href: eidtorCss,
    },
    {
      rel: "stylesheet",
      href: editorTextAreaCss,
    },
    {
      rel: "stylesheet",
      href: playgourndCss,
    },
  ];
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Onboarding | ${rootData.store?.name}`,
    description:
      "Onboarding process to start your journey for better personlization.",
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  try {
    const response = await Promise.all([
      sdk.CheckUserOrboarded({}, { request, forbiddenRedirect: "/" }),
      sdk.GetUserStore({}, { request }),
      sdk.GetPublicWorkflows(
        {
          take: 3,
          skip: 0,
        },
        { request }
      ),
    ]);

    const store = response[1].getUserStore;
    if (response[0].checkUserOnboarded === true && store?.subdomain) {
      return redirectToSubdomain(request, store?.subdomain, "/dashboard");
    }

    return json<OnboardingData>({
      store,
      workflows: response[2].getPublicWorkflows,
    });
  } catch (err) {
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    await sdk.Me({}, { request, forbiddenRedirect: "/" });

    const formData = await request.clone().formData();
    const action = formData.get("_action");

    if (action === ActionEnum.checkNameAvailabel) {
      await validateForm(Page3Schema, formData);
      const subdomain = formData.get("subdomain") as string;
      const available = await sdk.subdomainAvailable(
        { subdomain },
        { request }
      );

      if (available.subdomainAvailable) {
        return { available: true };
      }
      return { available: false };
    }

    if (action === ActionEnum.createBusiness) {
      const { _action, ...rest } = Object.fromEntries(
        formData.entries()
      ) as unknown as Omit<IOnboardingFormValues, "stateCount"> & {
        _action: string;
      };
      await validateForm(
        Page1Schema.concat(Page2Schema)
          .concat(Page3Schema)
          .omit(["stateCount"]),
        formData
      );
      const store = await sdk.CompleteOnboarding(
        {
          input: {
            ...rest,
          },
        },
        { request, forbiddenRedirect: "/" }
      );

      if (store.completeOnboarding) {
        const url = new URL(request.url);
        return redirect(
          `${url.protocol}//${store.completeOnboarding?.subdomain}.${url.host}/dashboard`
        );
      } else {
        return { available: false };
      }
    }
    return null;
  } catch (err) {
    console.log(err);
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

const OnboardingWelcome = () => {
  const submit = useSubmit();
  const transition = useTransition();

  const loaderData = useLoaderData<OnboardingData>();

  const isCreating =
    transition.submission &&
    transition.submission.formData.get("_action") === ActionEnum.createBusiness;

  const handleSubmit = (values: IOnboardingFormValues) => {
    if (loading || isCreating) return;
    const formData = new FormData();
    formData.append("_action", ActionEnum.createBusiness);
    delete values.stateCount;
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, String(value));
    }
    submit(formData, { method: "post" });
  };

  const loading =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <FormikStepper
      initialValues={{
        about: loaderData.store?.about?.about ?? "",
        name: loaderData.store?.name ?? "",
        subdomain: "",
        senderEmail: loaderData.store?.contact?.senderEmail ?? "",
        senderName: loaderData.store?.contact?.senderName ?? "",
        address1: loaderData.store?.contact?.address1 ?? "",
        city: loaderData.store?.contact?.city ?? "",
        country: loaderData.store?.contact?.country ?? "",
        zipCode: loaderData.store?.contact?.zipCode ?? "",
        address2: loaderData.store?.contact?.address2 ?? "",
        state: loaderData.store?.contact?.state ?? "",
        stateCount: 0,
      }}
      isCreating={isCreating ?? false}
      onSubmit={handleSubmit}
    >
      <FormikStep validationSchema={HelloSchema}>
        <Hello />
      </FormikStep>
      {/* <FormikStep validationSchema={HelloSchema}>
        <Challenges />
      </FormikStep>
      <FormikStep validationSchema={HelloSchema}>
        <Community />
      </FormikStep> 
      <FormikStep validationSchema={HelloSchema}>
        <GoodJob />
      </FormikStep>
      */}
      <FormikStep validationSchema={Page1Schema}>
        <Page1 />
      </FormikStep>

      <FormikStep validationSchema={Page2Schema}>
        <Page2 />
      </FormikStep>
      <FormikStep validationSchema={Page3Schema}>
        <Page3 />
      </FormikStep>
      <FormikStep validationSchema={HelloSchema}>
        <Finish />
      </FormikStep>
    </FormikStepper>
  );
};
export default OnboardingWelcome;

interface FormikStepProps
  extends Pick<
    FormikConfig<IOnboardingFormValues>,
    "children" | "validationSchema"
  > {}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

const FormikStepper: React.FC<
  React.PropsWithChildren<
    FormikConfig<IOnboardingFormValues> & { isCreating: boolean }
  >
> = ({ children, isCreating, ...props }) => {
  const transition = useTransition();
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const actionData = useActionData<{
    errors: IOnboardingFormValues;
    available: boolean;
  }>();

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const isLastStep = step === childrenArray.length - 1;
  const subdomainStep = step === childrenArray.length - 2;

  const ischeckingName =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      ActionEnum.checkNameAvailabel;

  const handleSubmit = useCallback(
    async (
      values: IOnboardingFormValues,
      helpers: FormikHelpers<IOnboardingFormValues>
    ) => {
      if (isLastStep) {
        await props.onSubmit(values, helpers);
      } else {
        setStep((s) => s + 1);
        helpers.setErrors({});
      }
    },
    [isLastStep, props]
  );

  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors, validateField }) => {
        const disableNext =
          isSubmitting ||
          isCreating ||
          ischeckingName ||
          !!errors.subdomain ||
          actionData?.available === false
            ? true
            : false;
        const disableBackButton = step <= 0 || isSubmitting || ischeckingName;

        const handleButtonClick = () => {
          if (disableNext) return;

          if (subdomainStep && actionData?.available) {
            handleSubmit();
          } else if (subdomainStep && !actionData?.available) {
            validateField("subdomain");
          } else if (!subdomainStep) {
            handleSubmit();
          }
        };
        const text = isLastStep
          ? "Create"
          : step === 0
          ? "Begin Journey"
          : "Next";

        const backButtonClick = () => {
          if (disableBackButton) return;
          else {
            setStep((s) => s - 1);
          }
        };

        return (
          <Form>
            <Container>
              <Flex justifyContent="center">
                <Box width="91.5%" paddingY={6}>
                  <Flex justifyContent="end" gap={1}>
                    {step === 0 ? undefined : (
                      <Button
                        text="Back"
                        onClick={backButtonClick}
                        disabled={disableBackButton}
                        color="gray"
                        size="lg"
                      />
                    )}
                    <Button
                      size="lg"
                      color="red"
                      text={text}
                      disabled={disableNext}
                      onClick={handleButtonClick}
                    />
                  </Flex>
                  <Box marginTop={4} />
                  {currentChild}
                </Box>
              </Flex>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};
