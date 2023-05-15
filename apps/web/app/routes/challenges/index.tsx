import { Outlet, useLocation } from "@remix-run/react";
import { Box, Container, Flex, PageHeader, Tabs } from "gestalt";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Challenges - Dashboard | ${rootData.store?.name}`,
    description: "Your Challenges to complete",
  };
};

export type ChallengeLoaderData = {};

export async function loader({ request }: LoaderArgs) {
  const isprivate = await isPrivateRoute(request);
  if (isprivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  return json(null);
}

export default function Quests() {
  const location = useLocation();

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              title="PERIODIC REPORTS"
              subtext="Reports sent to you daily, weekly and quarterly"
            />

            <Flex justifyContent="center">
              <Box width="93.5%" paddingY={6}>
                <Flex justifyContent="center">
                  <Box width="98%">
                    <Flex direction="column" gap={4}>
                      <Tabs
                        onChange={() => undefined}
                        activeTabIndex={
                          location.pathname === "/challenges"
                            ? 0
                            : location.pathname === "/challenges/daily"
                            ? 1
                            : 2
                        }
                        tabs={[
                          { href: "/challenges", text: "THIS WEEK" },
                          {
                            href: "/challenges/daily",
                            text: "DAILY",
                            indicator: "dot",
                          },

                          {
                            href: "/challenges/milestone",
                            text: "QUARTERLY",
                          },
                        ]}
                      />
                      <Outlet />
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
