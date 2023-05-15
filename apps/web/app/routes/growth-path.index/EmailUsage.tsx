import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, Text } from "gestalt";
import ProgressBar from "../../components/ProgressBar";
import {
  BillingPlanStatus,
  EmailSentLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import type { GrowthPathData } from "../growth-path/types";
import { numberWithCommas } from "../pricing/pricingUtil";
import type { GrowthPathChooseData } from "./types";

export default function EmailUsage() {
  const loaderData = useLoaderData<GrowthPathChooseData>();
  const parentData = useRouteLoaderData(
    "routes/growth-path/index"
  ) as GrowthPathData;

  const rootData = useRouteLoaderData("root") as RootData;
  const active =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Active;

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
          <Box display={active ? "block" : "none"}>
            <Text size="200" inline color="subtle" weight="bold">
              OF{" "}
            </Text>
            <Text size="200" weight="bold" inline>
              {numberWithCommas(
                (parentData.billing?.contactsQuantity ?? 0) * 10
              )}
            </Text>
          </Box>
        </Flex>

        <ProgressBar
          bgColor={
            rootData?.store?.emailSentLimitStatus ===
            EmailSentLimitStatus.Allowed
              ? "#008753"
              : rootData?.store?.emailSentLimitStatus ===
                EmailSentLimitStatus.BrinkOfDissalwoed
              ? "#bd5b00"
              : "#CC0000"
          }
          baseBgColor="#F9F9F9"
          height="30px"
          isLabelVisible={false}
          completed={
            parentData?.billing?.emailSendQuantity === 0
              ? 0
              : ((loaderData.emailSentThisMonthCount ?? 0) /
                  (parentData?.billing?.emailSendQuantity ?? 0)) *
                100
          }
        />

        <Text align="forceRight" color="subtle" size="100">
          {loaderData.emailSentTodayCount ?? 0} emails sent today
        </Text>

        {/* {rootData?.store?.emailSentLimitStatus ===
          EmailSentLimitStatus.Disallowed && (
          <SlimBanner
            type="warning"
            message="Not enough email sends available. Upgrade to start sending emails."
            iconAccessibilityLabel="warning"
          />
        )} */}
      </Flex>
    </Flex>
  );
}
