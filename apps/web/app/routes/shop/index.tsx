import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Box, Callout, Container, Flex, PageHeader } from "gestalt";
import BigContainer from "~/components/BigContainer";
import type { RootData } from "../../root";

import Naviagation from "../../components/Navigation/Navigation";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  return {};
}

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Shop | ${rootData.store?.name}`,
    description: "Shop using credits for signup form, email templates etc...",
  };
};

export default function SignupForms() {
  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <Container>
              <PageHeader
                borderStyle="none"
                title="SHOP"
                subtext="Buy newly designed Sign Up Forms, Email Templates with Credits."
              />
              <Flex justifyContent="center">
                <Box width="92.5%" paddingY={6}>
                  <Callout
                    iconAccessibilityLabel=""
                    message="Launching shop with the Q2 Update."
                    title="Shop is comming soon!"
                    type="info"
                  />
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
