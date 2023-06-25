import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { withYup } from "@remix-validated-form/with-yup";
import { Box, Button, Container, Dropdown, Flex, PageHeader } from "gestalt";
import * as yup from "yup";
import BigContainer from "~/components/BigContainer";
import Naviagation from "../../components/Navigation";
import { AboutIndustryEnum } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import Analytics from "./Analytics";
import DashboardCallouts from "./DashboardCallouts";
import type { DashboardData } from "./types";
import { DashboardActionEnum, UpdateIndustrySchema } from "./types";
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
  const emailMetric = sdk.GetStoreEmailMetric({ subdomain }, { request });
  const banchmarkData = sdk.GetBenchmarkData({ subdomain }, { request });

  return defer({
    billing: storeBilling.getStoreBilling,
    emailMetricPromise: emailMetric,
    benchmarkDataPromise: banchmarkData,
    // storeRevenuePromise: storeRevenue,
    // storeDailyRevenuePromise: storeDailyRevenue,
  } satisfies DashboardData);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === DashboardActionEnum.updateIndustry) {
    const validator = withYup(
      UpdateIndustrySchema.shape({
        _action: yup.string().required(),
        aboutId: yup.string().required(),
      })
    );
    const result = await validator.validate(formData);

    if (result.error) {
      return null;
    }

    const industry = formData.get("industry") as keyof typeof AboutIndustryEnum;
    const aboutId = formData.get("aboutId") as string;

    await sdk.UpdateIndustry(
      {
        aboutId,
        industry: AboutIndustryEnum[industry],
      },
      { request }
    );
  }

  return null;
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
              subtext="Your Metrics and Benchmarks. Head over to Periodic Reports to drive performance. Upload your customer emails under lists."
              primaryAction={{
                component: (
                  <Button
                    color="gray"
                    size="lg"
                    text="Lists"
                    role="link"
                    href="/subscriber-lists"
                  />
                ),
                dropdownItems: [
                  <Dropdown.Link
                    href="/subscriber-lists"
                    key="subscriber-lists"
                    option={{ label: "Lists", value: "upload-list" }}
                  />,
                ],
              }}

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
                <Analytics />
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
