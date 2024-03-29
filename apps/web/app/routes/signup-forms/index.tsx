import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Container,
  Dropdown,
  Flex,
  PageHeader,
} from "gestalt";
import { Suspense, lazy, useReducer } from "react";
import { ClientOnly } from "remix-utils";
import { sdk } from "~/graphql/graphqlWrapper.server";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import Forms from "./Forms";
import type { SignupFormsData } from "./types";
import { SignupFormActionEnum } from "./types";
import useSignupFormLimitReached from "./useSignupFormCount";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

const InstallCodeSnippet = lazy(() => import("./InstallCode"));

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Signup Forms | ${rootData.store?.name}`,
    description:
      "Forms to add subscribers to a list from your connected website. Add a form to display on your website.",
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
    sdk.GetSignupForms(
      {
        subdomain,
      },
      { request, forbiddenRedirect: "/" }
    ),
    sdk.GetStoreBilling(
      {
        subdomain,
      },
      {
        request,
      }
    ),
  ]);

  const forms = response[0];
  const billing = response[1];

  return json<SignupFormsData>({
    forms: forms.getSignupForms,
    billing: billing.getStoreBilling,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action");

  if (action === SignupFormActionEnum.deleteForm) {
    const formId = formData.get("formId") as string;
    await sdk.DeleteSignupForm(
      {
        signupFormId: formId,
      },
      { request, forbiddenRedirect: "/" }
    );
  }

  return null;
}

export default function SignupForms() {
  const loaderData = useLoaderData<SignupFormsData>();

  const [codeSinppet, toggleCodeSnippet] = useReducer((s) => !s, false);

  const { limitReached } = useSignupFormLimitReached();

  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <Container>
              <PageHeader
                borderStyle="none"
                title="SIGN-UP FORMS"
                primaryAction={{
                  component: (
                    <Button
                      text="Create"
                      color="red"
                      size="lg"
                      href="/signup-forms/add-form"
                      role="link"
                      disabled={limitReached}
                    />
                  ),
                  dropdownItems: [
                    <Dropdown.Link
                      key="create"
                      option={{ label: "Create", value: "create" }}
                      href="/signup-forms/add-form"
                    />,
                  ],
                }}
                secondaryAction={{
                  component: (
                    <Button
                      text="Install Code Snippet"
                      color="gray"
                      size="lg"
                      onClick={toggleCodeSnippet}
                    />
                  ),
                  dropdownItems: [
                    <Dropdown.Item
                      onSelect={toggleCodeSnippet}
                      key="install-script"
                      option={{
                        label: "Install Code Snippet",
                        value: "install-script",
                      }}
                    />,
                  ],
                }}
              />
              {codeSinppet && (
                <ClientOnly fallback={null}>
                  {() => (
                    <Suspense fallback={null}>
                      <InstallCodeSnippet close={toggleCodeSnippet} />
                    </Suspense>
                  )}
                </ClientOnly>
              )}
              <Flex justifyContent="center">
                <Box width="92.5%" paddingY={6}>
                  {loaderData.forms?.length === 0 ||
                  loaderData.forms === null ||
                  loaderData.forms === undefined ? (
                    <Box marginBottom={8}>
                      <Callout
                        iconAccessibilityLabel="warning"
                        title="Quickly Add Forms"
                        key="add subs"
                        type="recommendation"
                        message="You can add forms from the Template & Forms page. Also subscribe to a paid plan to get new forms every month."
                        primaryAction={{
                          accessibilityLabel: "templates and forms",
                          label: "Templates & Forms",
                          href: "/folder",
                        }}
                        secondaryAction={{
                          accessibilityLabel: "Subscription Rewards",
                          label: "Subscription Rewards",
                          href: "/plan/subscription-rewards",
                        }}
                      />
                    </Box>
                  ) : (
                    <>
                      <ExceededCallouts />
                      <Forms />
                    </>
                  )}
                </Box>
              </Flex>
            </Container>
          </Flex.Item>
        </Flex>
      </BigContainer>
      <Outlet />
    </>
  );
}

const ExceededCallouts = () => {
  const { limitReached, planType } = useSignupFormLimitReached();

  if (!limitReached) return null;

  return (
    <Box marginBottom={8}>
      <Callout
        iconAccessibilityLabel="warning"
        title="Creating Forms are now disabled!"
        key="add subs"
        type="error"
        message={`You have currently reached the limit of creating sign-up forms. ${
          planType === "advanced" ? "" : "Head over to the Plan tab to upgrade."
        }`}
        primaryAction={
          planType === "advanced"
            ? undefined
            : {
                accessibilityLabel: "plan",
                label: "Plan",
                href: "/plan",
              }
        }
      />
    </Box>
  );
};
