import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Box, Callout, Flex, PageHeader } from "gestalt";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }
  return {};
}

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Buy credits for ${rootData.store?.name}`,
    description: "Buy credits in discount.",
  };
};

export default function SignupForms() {
  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <PageHeader
              title="CREDITS"
              subtext="Top up with credits to buy Items from Shop."
            />
            <Flex justifyContent="center">
              <Box width="92.5%" paddingY={6}>
                <Callout
                  iconAccessibilityLabel=""
                  message="Launching Credits with the Q2 Update."
                  title="Credits are comming soon!"
                  type="info"
                />
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>
      </BigContainer>
      <Outlet />
    </>
  );
}
