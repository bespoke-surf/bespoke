import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSubmit, useTransition } from "@remix-run/react";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { Box, Button, Flex, Link, Text, TextField } from "gestalt";
import { useCallback } from "react";
import * as yup from "yup";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { validateForm } from "~/utils/validateForm.server";
import UnauthPageLayot from "../../components/PageLayout/UnauthPageLayout";

const LoginInputSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("please enter your email"),
  loginCode: yup.string(),
});

interface LoginFromValues {
  email: string;
  loginCode: string;
}

interface ActionData {
  confirmCode: boolean;
  errors: LoginFromValues;
}

const enum ActionEnum {
  login = "login",
  confirmCode = "confirmCode",
}

export const meta: MetaFunction = () => {
  return {
    title: "Log in | Bespoke", // <title>Josie's Shake Shack</title>
    description: "Log in to your bespoke account.", // <meta name="description" content="Delicious shakes">
  };
};

export let action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.clone().formData();
    await validateForm(LoginInputSchema, formData);
    const email = formData.get("email") as string;
    const action = formData.get("_action") as string;

    if (action === ActionEnum.login) {
      const emialLogin = await sdk.EmailLogin(
        { input: { email } },
        { request }
      );
      if (emialLogin?.emailLogin) {
        return json<ActionData>({
          confirmCode: true,
          errors: {
            email: "",
            loginCode: "",
          },
        });
      } else {
        return json<ActionData>({
          confirmCode: false,
          errors: {
            email: "Does not exist, try Signing up",
            loginCode: "",
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
        return redirect("/", { headers: response._headers });
      } else {
        return json<ActionData>({
          confirmCode: true,
          errors: {
            email: "",
            loginCode: "Invalid login code",
          },
        });
      }
    }

    return json<ActionData>({
      confirmCode: false,
      errors: {
        email: "Something bad happened",
        loginCode: "",
      },
    });
  } catch (err) {
    console.log(err);
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

const Login = () => {
  const submit = useSubmit();
  const actionData = useActionData<ActionData>();
  const transtion = useTransition();

  const handleOnSubmit = useCallback(
    (values: LoginFromValues, action: FormikHelpers<LoginFromValues>) => {
      const formData = new FormData();
      formData.append("email", values.email);
      if (actionData?.confirmCode) {
        if (!values.loginCode || values.loginCode === "") {
          action.setFieldError("loginCode", "please enter a login code");
          return;
        }
        formData.append("loginCode", values.loginCode);
        formData.append("_action", ActionEnum.confirmCode);
      } else {
        formData.append("_action", ActionEnum.login);
      }
      submit(formData, { method: "post" });
    },
    [actionData?.confirmCode, submit]
  );

  const formik = useFormik<LoginFromValues>({
    initialValues: { email: "", loginCode: "" },
    onSubmit: handleOnSubmit,
    validationSchema: LoginInputSchema,
  });

  return (
    <UnauthPageLayot
      pageHeaderPorps={{
        title: "Login",
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
              id="email"
              placeholder="Email to log in"
              type="email"
              autoComplete="email"
              name="email"
              onChange={({ event }) => formik.handleChange(event)}
              onBlur={({ event }) => formik.handleBlur(event)}
              value={formik.values.email}
              errorMessage={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : actionData?.errors.email
                  ? actionData.errors.email
                  : null
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
                  placeholder="Paste login code"
                  autoComplete="off"
                  onChange={({ event }) => formik.handleChange(event)}
                  onBlur={({ event }) => formik.handleBlur(event)}
                  value={formik.values.loginCode}
                  type="text"
                  name="loginCode"
                  errorMessage={
                    formik.touched.loginCode && formik.errors.loginCode
                      ? formik.errors.loginCode
                      : actionData?.errors.loginCode
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
              text={
                transtion.state === "loading" ||
                transtion.state === "submitting"
                  ? "Loading"
                  : actionData?.confirmCode
                  ? "Confirm code"
                  : "Login"
              }
              disabled={
                transtion.state === "loading" ||
                transtion.state === "submitting"
              }
              fullWidth={true}
              size="lg"
              color="red"
              onClick={() => formik.handleSubmit()}
            />
          </Box>

          <Box marginTop={8}>
            <Text align="center">
              Don't have an account?{" "}
              <Link display="inlineBlock" href="/signup">
                Sign Up{" "}
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </UnauthPageLayot>
  );
};
export default Login;
