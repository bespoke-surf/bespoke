import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { withYup } from "@remix-validated-form/with-yup";
import {
  Box,
  Button,
  Container,
  Dropdown,
  Flex,
  Heading,
  Link,
  PageHeader,
  Text,
} from "gestalt";
import { ClientOnly } from "remix-utils";
import * as yup from "yup";
import BigContainer from "~/components/BigContainer";
import Naviagation from "../../components/Navigation/Navigation";
import { AboutIndustryEnum } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import Analytics from "./Analytics";
import DashboardCallouts from "./DashboardCallouts";
import GettingStarted from "./GettingStarted";
import Resources from "./Resrouces";
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
  const gettingStarted = sdk.GettingStarted({ subdomain }, { request });

  return defer({
    billing: storeBilling.getStoreBilling,
    emailMetricPromise: emailMetric,
    benchmarkDataPromise: banchmarkData,
    gettinStartedPromise: gettingStarted,
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
  const { gettinStartedPromise } = useLoaderData() as DashboardData;

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
              title="HOME"
              subtext=""
              primaryAction={{
                component: (
                  <Button
                    color="gray"
                    size="md"
                    text="View Public Website"
                    role="link"
                    href="/dashboard/public-profile"
                  />
                ),
                dropdownItems: [
                  <Dropdown.Link
                    href="/dashboard/public-profile"
                    key="public-profile"
                    option={{
                      label: "View Public Profile",
                      value: "public-profile",
                    }}
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
                <Flex direction="column" gap={8}>
                  <Await resolve={gettinStartedPromise}>
                    {({ gettingStarted }) => (
                      <GettingStarted gettingStartedData={gettingStarted} />
                    )}
                  </Await>
                  <Analytics />
                  <Resources />
                  <Box marginTop={8}>
                    <Flex justifyContent="between" alignItems="center">
                      <Flex direction="column" gap={0}>
                        <Heading size="500">Need help?</Heading>

                        <Text color="subtle" inline>
                          Get quick real time help from{" "}
                          <Link
                            href="https://discord.gg/h8gekTtq"
                            display="inlineBlock"
                            underline="none"
                            target="blank"
                          >
                            <Text weight="bold" inline>
                              Devs on Discord.
                            </Text>
                          </Link>
                        </Text>
                        <Text color="subtle" inline>
                          See detailed reports on our latest{" "}
                          <Link
                            href="https://feedback.bespoke.surf/changelog"
                            display="inlineBlock"
                            underline="none"
                            target="blank"
                          >
                            <Text weight="bold" inline>
                              Feature Releases.
                            </Text>
                          </Link>
                        </Text>
                        <Text color="subtle" inline>
                          Privately communicate with us via{" "}
                          <Link
                            href="mailto:support@bespoke.surf"
                            display="inlineBlock"
                            underline="none"
                            target="blank"
                          >
                            <Text inline weight="bold">
                              Email
                            </Text>
                          </Link>{" "}
                          or{" "}
                          <Link
                            href="https://twitter.com/bespoke_surf"
                            display="inlineBlock"
                            underline="none"
                            target="blank"
                          >
                            <Text inline weight="bold">
                              Twitter DM's.
                            </Text>
                          </Link>
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
      <ClientOnly>{() => <Outlet />}</ClientOnly>
    </BigContainer>
  );
}
