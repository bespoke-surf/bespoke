import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useSearchParams,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { Box, Button, Flex, Link, Text, TextField } from "gestalt";
import { useCallback } from "react";
import * as yup from "yup";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { validateForm } from "~/utils/validateForm.server";
import UnauthPageLayot from "../../components/PageLayout/UnauthPageLayout";

const SignupInputSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "please enter a valid name")
    .required("please enter your name"),

  email: yup
    .string()
    .email("please enter a valid email")
    .required("please enter your email"),

  loginCode: yup.string(),
});

interface MarketingFromValues {
  email: string;
  name: string;
  loginCode: string;
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign up | Bespoke",
    description: "Sign up to a new bespoke account.",
  };
};

const enum ActionEnum {
  signup = "singup",
  confirmCode = "confirmCode",
}

interface IActionData {
  confirmCode: boolean;
  errors: MarketingFromValues;
}

export let action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.clone().formData();
    await validateForm(SignupInputSchema, formData);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    const action = formData.get("_action") as string;

    if (action === ActionEnum.signup) {
      const user = await sdk.SignupWithEmail(
        {
          input: {
            email,
            name,
          },
        },
        { request }
      );
      if (user.signupWithEmail?.id) {
        return json<IActionData>({
          confirmCode: true,
          errors: {
            email: "",
            loginCode: "",
            name: "",
          },
        });
      }
      if (!user.signupWithEmail) {
        return json<IActionData>({
          confirmCode: false,
          errors: {
            email: "Already exist, try Logging in",
            loginCode: "",
            name: "",
          },
        });
      }
    }
    if (action === ActionEnum.confirmCode) {
      const loginCode = formData.get("loginCode") as string;
      const response = await sdk.ConfirmCodeAndLogin(
        {
          loginCode,
        },
        { request }
      );
      if (response.confirmCodeAndLogin) {
        return redirect("/onboarding", { headers: response._headers });
      } else {
        return json<IActionData>({
          confirmCode: true,
          errors: {
            loginCode: "Invalid code",
            email: "",
            name: "",
          },
        });
      }
    }

    return json<IActionData>({
      confirmCode: false,
      errors: {
        email: "something went wrong",
        loginCode: "",
        name: "",
      },
    });
  } catch (errors) {
    if (errors instanceof Response) throw errors;
    return { errors };
  }
};

const MarketingIndex = () => {
  const submit = useSubmit();
  const transtion = useTransition();
  const actionData = useActionData<IActionData>();
  const [searchParams] = useSearchParams();

  const s_name = searchParams.get("name");
  const s_email = searchParams.get("email");
  const s_integration = searchParams.get("integration");

  const handleOnSubmit = useCallback(
    (
      values: MarketingFromValues,
      action: FormikHelpers<MarketingFromValues>
    ) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      if (actionData?.confirmCode === true) {
        if (!values.loginCode || values.loginCode === "") {
          action.setFieldError("loginCode", "please enter a login code");
          return;
        }
        formData.append("_action", ActionEnum.confirmCode);
        formData.append("loginCode", values.loginCode);
      } else {
        formData.append("_action", ActionEnum.signup);
      }
      submit(formData, { method: "post" });
    },
    [actionData?.confirmCode, submit]
  );

  const formik = useFormik<MarketingFromValues>({
    initialValues: {
      email: s_email ?? "",
      name: s_name ?? "",
      loginCode: "",
    },
    enableReinitialize: true,
    onSubmit: handleOnSubmit,
    validationSchema: SignupInputSchema,
  });

  return (
    <UnauthPageLayot
      pageHeaderPorps={{
        title: "Sign Up",
        subtext: "By continuing, you agree to Bespoke's",
        helperLink: {
          text: "Terms of Service & Privacy Policy",
          accessibilityLabel: "Terms of service & Privacy policy",
          href: "/terms-of-service",
        },
      }}
    >
      <Box
        direction="column"
        display="flex"
        alignItems="center"
        alignContent="center"
        rounding={5}
        padding={4}
        margin={1}
      >
        <Box marginTop={8}>
          <Flex gap={2} direction="column">
            <TextField
              id="name"
              placeholder="Full name"
              type="text"
              name="name"
              autoComplete="on"
              onChange={({ event }) => formik.handleChange(event)}
              onBlur={({ event }) => formik.handleBlur(event)}
              value={formik.values.name}
              errorMessage={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : actionData?.errors?.name
                  ? actionData.errors.name
                  : null
              }
              size="lg"
            />
            <TextField
              id="email"
              placeholder="Email"
              type="email"
              name="email"
              autoComplete="email"
              onChange={({ event }) => formik.handleChange(event)}
              onBlur={({ event }) => formik.handleBlur(event)}
              value={formik.values.email}
              errorMessage={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : actionData?.errors?.email
                  ? actionData.errors.email
                  : s_integration
                  ? "To integrate with your shopify store, signup with this email"
                  : undefined
              }
              size="lg"
            />
            {actionData?.confirmCode && (
              <Box>
                <Flex alignItems="stretch" justifyContent="center">
                  <Box maxWidth={260} marginTop={2} marginBottom={4}>
                    <Text align="center">
                      We just sent you a temporary login code. Please check your
                      inbox.
                    </Text>
                  </Box>
                </Flex>
                <TextField
                  id="loginCode"
                  label="Login code"
                  placeholder="Paste login code"
                  onChange={({ event }) => formik.handleChange(event)}
                  onBlur={({ event }) => formik.handleBlur(event)}
                  value={formik.values.loginCode}
                  type="text"
                  autoComplete="off"
                  name="loginCode"
                  errorMessage={
                    formik.touched.loginCode && formik.errors.loginCode
                      ? formik.errors.loginCode
                      : actionData?.errors?.loginCode
                      ? actionData.errors.loginCode
                      : null
                  }
                  size="lg"
                />
              </Box>
            )}
          </Flex>
          <Box marginTop={4}>
            <Button
              role="button"
              type="submit"
              fullWidth={true}
              size="lg"
              color="blue"
              onClick={() => formik.handleSubmit()}
              text={
                transtion.state === "loading" ||
                transtion.state === "submitting"
                  ? "Loading"
                  : actionData?.confirmCode
                  ? "Confirm code"
                  : "Sign up"
              }
              disabled={
                transtion.state === "loading" ||
                transtion.state === "submitting"
              }
            />
          </Box>
          <Box marginTop={3}></Box>
          <Box marginTop={8}>
            <Text align="center">
              Already a member?{" "}
              <Link display="inlineBlock" href="/login">
                {" "}
                Login
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </UnauthPageLayot>
  );
};
export default MarketingIndex;
