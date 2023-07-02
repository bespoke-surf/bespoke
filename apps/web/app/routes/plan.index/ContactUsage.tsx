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

export default function ContactUsage() {
  const loaderData = useLoaderData<GrowthPathChooseData>();
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;

  const rootData = useRouteLoaderData("root") as RootData;
  const statusFree =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const planData = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === parentData.billing?.bespokePlanId
      ),
    [parentData.billing?.bespokePlanId]
  );

  const freenExceeded =
    (statusFree &&
      rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed) ||
    (statusFree &&
      rootData?.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.Disallowed);

  return (
    <Flex gap={4} direction="column">
      <Flex gap={2} direction="column">
        <Flex justifyContent="between">
          <Box>
            <Text size="200" weight="bold" color="dark" inline>
              {numberWithCommas(parentData?.subscriberCount ?? 0)}
            </Text>
            <Text size="200" weight="bold" inline color="subtle">
              {" "}
              CONTACTS
            </Text>
          </Box>
          <Box
            display={
              statusFree && rootData.ENV.OPEN_SOURCE === "false"
                ? "block"
                : "none"
            }
          >
            <Box>
              <Text size="200" inline color="subtle" weight="bold">
                OF{" "}
              </Text>
              <Text size="200" weight="bold" inline>
                {numberWithCommas(planData?.contacts ?? 0)}
              </Text>
            </Box>
          </Box>
        </Flex>
        <ProgressBar
          bgColor={
            rootData?.store?.contactLimitStatus === ContactLimitStatus.Allowed
              ? "#008753"
              : rootData?.store?.contactLimitStatus ===
                  ContactLimitStatus.BrinkOfDissalwoed && statusFree
              ? "#bd5b00"
              : "#CC0000"
          }
          baseBgColor="#F9F9F9"
          height="30px"
          completed={Math.ceil(
            ((parentData?.subscriberCount ?? 0) / (planData?.emails ?? 0)) * 100
          )}
          isLabelVisible={false}
        />
        <Text align="forceRight" color="subtle" size="100">
          {loaderData.subscriberAddedTodayCount} customers added today
        </Text>

        {freenExceeded && (
          <SlimBanner
            type="error"
            message="Contact limit exceeded. Please upgrade."
            iconAccessibilityLabel="error"
          />
        )}
      </Flex>
    </Flex>
  );
}
