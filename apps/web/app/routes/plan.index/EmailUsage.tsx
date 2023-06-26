import { bespokePricingPlan } from "@bespoke/common/dist/pricingPlan";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, SlimBanner, Text } from "gestalt";
import { useMemo } from "react";
import ProgressBar from "../../components/ProgressBar";
import {
  BillingPlanStatus,
  ContactLimitStatus,
  EmailSentLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import type { GrowthPathData } from "../plan/types";
import { numberWithCommas } from "../pricing/pricingUtil";
import type { GrowthPathChooseData } from "./types";

export default function EmailUsage() {
  const loaderData = useLoaderData<GrowthPathChooseData>();
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;

  const rootData = useRouteLoaderData("root") as RootData;
  const statusFree =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const free =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const freenExceeded =
    (free &&
      rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed) ||
    (free &&
      rootData?.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.Disallowed);

  const planData = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === parentData.billing?.bespokePlanId
      ),
    [parentData.billing?.bespokePlanId]
  );

  return (
    <Flex gap={4} direction="column">
      {/* <Heading size="400">Growing Email Sends</Heading> */}
      <Flex gap={2} direction="column">
        <Flex justifyContent="between">
          <Box>
            <Text size="200" weight="bold" inline color="dark">
              {numberWithCommas(loaderData.emailSentThisMonthCount ?? 0)}{" "}
            </Text>
            <Text size="200" weight="bold" color="subtle" inline>
              EMAIL SENT
            </Text>
          </Box>
          <Box display={statusFree && !rootData.OPEN_SOURCE ? "block" : "none"}>
            <Text size="200" inline color="subtle" weight="bold">
              OF{" "}
            </Text>
            <Text size="200" weight="bold" inline>
              {numberWithCommas(planData?.emails ?? 0)}
            </Text>
          </Box>
        </Flex>

        <ProgressBar
          bgColor={
            rootData?.store?.emailSentLimitStatus ===
            EmailSentLimitStatus.Allowed
              ? "#008753"
              : rootData?.store?.emailSentLimitStatus ===
                  EmailSentLimitStatus.BrinkOfDissalwoed && statusFree
              ? "#bd5b00"
              : "#CC0000"
          }
          baseBgColor="#F9F9F9"
          height="30px"
          isLabelVisible={false}
          completed={
            planData?.emails === 0
              ? 0
              : (loaderData.emailSentThisMonthCount ?? 0) /
                (planData?.emails ?? 0)
          }
        />

        <Text align="forceRight" color="subtle" size="100">
          {loaderData.emailSentTodayCount ?? 0} emails sent today
        </Text>

        {freenExceeded && (
          <SlimBanner
            type="error"
            message="Email sends exceeded. Please upgrade."
            iconAccessibilityLabel="error"
          />
        )}
      </Flex>
    </Flex>
  );
}
