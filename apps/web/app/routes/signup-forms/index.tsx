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
import { sdk } from "~/graphql/graphqlWrapper.server";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import Forms from "./Forms";
import type { SignupFormsData } from "./types";
import { SignupFormActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

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
  ]);

  const forms = response[0];

  return json<SignupFormsData>({
    forms: forms.getSignupForms,
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

  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <Container>
              <PageHeader
                borderStyle="none"
                title="SIGNUP FORMS"
                subtext="Forms to add subscribers to a list. Create a form to display on your store."
                primaryAction={{
                  component: (
                    <Button
                      text="Create"
                      color="red"
                      size="lg"
                      href="/signup-forms/add-form"
                      role="link"
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
              />
              <Flex justifyContent="center">
                <Box width="92.5%" paddingY={6}>
                  {loaderData.forms?.length === 0 ||
                  loaderData.forms === null ||
                  loaderData.forms === undefined ? (
                    <Box marginBottom={8}>
                      <Callout
                        iconAccessibilityLabel="warning"
                        title="Easily add forms from the 'Folder' tab"
                        key="add subs"
                        type="recommendation"
                        message="Quickly add new forms from your folder tab. Take advantage of exciting Growth Path rewards and Subscription Rewards."
                        primaryAction={{
                          accessibilityLabel: "forlder",
                          label: "Folder",
                          href: "/folder",
                        }}
                      />
                    </Box>
                  ) : (
                    <Forms />
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
