import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, Text } from "gestalt";
import ProgressBar from "../../components/ProgressBar";
import {
  BillingPlanStatus,
  ContactLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import type { GrowthPathData } from "../growth-path/types";
import { numberWithCommas } from "../pricing/pricingUtil";
import type { GrowthPathChooseData } from "./types";

export default function ContactUsage() {
  const loaderData = useLoaderData<GrowthPathChooseData>();
  const parentData = useRouteLoaderData(
    "routes/growth-path/index"
  ) as GrowthPathData;

  const rootData = useRouteLoaderData("root") as RootData;
  const active =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Active;

  return (
    <Flex gap={4} direction="column">
      {/* <Heading size="400">Growing Contacts</Heading> */}
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
          <Box display={active ? "block" : "none"}>
            <Box>
              <Text size="200" inline color="subtle" weight="bold">
                OF{" "}
              </Text>
              <Text size="200" weight="bold" inline>
                {numberWithCommas(parentData.billing?.contactsQuantity ?? 0)}
              </Text>
            </Box>
          </Box>
        </Flex>
        <ProgressBar
          bgColor={
            rootData?.store?.contactLimitStatus === ContactLimitStatus.Allowed
              ? "#008753"
              : rootData?.store?.contactLimitStatus ===
                ContactLimitStatus.BrinkOfDissalwoed
              ? "#bd5b00"
              : "#CC0000"
          }
          baseBgColor="#F9F9F9"
          height="30px"
          completed={Math.ceil(
            ((parentData?.subscriberCount ?? 0) /
              (parentData?.billing?.contactsQuantity ?? 0)) *
              100
          )}
          isLabelVisible={false}
        />
        <Text align="forceRight" color="subtle" size="100">
          {loaderData.subscriberAddedTodayCount} customers added today
        </Text>

        {/* {rootData?.store?.contactLimitStatus ===
          ContactLimitStatus.Disallowed && (
          <SlimBanner
            type="warning"
            message="Unavailable on your current plan. Upgrade to start adding contacts."
            iconAccessibilityLabel="warning"
          />
        )} */}
      </Flex>
    </Flex>
  );
}
