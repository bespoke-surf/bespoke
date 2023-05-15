import { Container, Flex } from "gestalt";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
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

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Settings | ${rootData.store?.name}`,
    description:
      "Add or update settings of your business profile, posts, products etc...",
  };
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  return null;
}

export default function Settings() {
  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <Outlet />
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
