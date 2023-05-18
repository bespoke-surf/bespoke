import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Container, Flex } from "gestalt";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { GrowthPathData } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Growth Path Rewards | ${rootData.store?.name}`,
    description:
      "Growth Path rewards received after leveling up and gaining Growth stars",
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
    sdk.GetStoreBilling(
      {
        subdomain,
      },
      {
        request,
      }
    ),
    sdk.GetSubscribersCount(
      {
        subdomain,
      },
      { request }
    ),
    sdk.GetIntegrationWithSubdomain(
      { subdomain },
      { request, forbiddenRedirect: "/" }
    ),
  ]);

  const billing = response[0].getStoreBilling;
  const subscriberCount = response[1].getSubscribersCount;
  const integration = response[2].getIntegrationWithSubdomain;

  return json<GrowthPathData>({
    billing,
    subscriberCount,
    integration,
  });
}

export default function Plans() {
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
