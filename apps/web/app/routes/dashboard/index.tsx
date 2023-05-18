import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Box, Container, Flex, PageHeader } from "gestalt";
import BigContainer from "~/components/BigContainer";
import Naviagation from "../../components/Navigation";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import DashboardCallouts from "./DashboardCallouts";
import type { DashboardData } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Dashboard | ${rootData.store?.name}`,
    description: "Dashboard with benchmarks, metrics and xp level",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isprivate = await isPrivateRoute(request);
  if (isprivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const storeBilling = await sdk.GetStoreBilling({ subdomain }, { request });

  // const storeRevenue = sdk.GetStoreRevenue({ subdomain }, { request });

  // const storeDailyRevenue = sdk.GetStoreDailyRevenueTrend(
  //   { subdomain },
  //   { request }
  // );

  return defer({
    billing: storeBilling.getStoreBilling,
    // storeRevenuePromise: storeRevenue,
    // storeDailyRevenuePromise: storeDailyRevenue,
  } satisfies DashboardData);
}

export default function Dashboard() {
  // const location = useLocation();
  // const { storeRevenuePromise, storeDailyRevenuePromise } =
  //   useLoaderData() as DashboardData;
  // const revenuePromise = suspendAll([
  //   storeRevenuePromise,
  //   storeDailyRevenuePromise,
  // ]);

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              title="Home"
              subtext="Replicate any automations shared by the experts and start growing your business now."
              // items={[
              //   <Suspense
              //     key="revenue"
              //     fallback={
              //       <Datapoint
              //         key="revenue"
              //         size="md"
              //         title="Revenue"
              //         value={`-`}
              //         trendSentiment="auto"
              //         tooltipText="Your total revenue. Measurig daily trends."
              //         trend={{
              //           accessibilityLabel: "trends daily",
              //           value: 0,
              //         }}
              //       />
              //     }
              //   >
              //     <Await resolve={revenuePromise}>
              //       {([revenue, trend]) => {
              //         return (
              //           <Datapoint
              //             key="revenue"
              //             size="md"
              //             title="Revenue"
              //             value={`${
              //               revenue.getStoreRevenue
              //                 ? millify(revenue?.getStoreRevenue / 100)
              //                 : "-"
              //             }`}
              //             trendSentiment="auto"
              //             tooltipText="Your total revenue. Measurig daily trends."
              //             trend={{
              //               accessibilityLabel: "trends daily",
              //               value: trend?.getStoreDailyRevenueTrend ?? 0,
              //             }}
              //           />
              //         );
              //       }}
              //     </Await>
              //   </Suspense>,
              // ]}
            />
            <Flex justifyContent="center">
              <Box width="93.5%" paddingY={6}>
                <DashboardCallouts />
                <Outlet />
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
