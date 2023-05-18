import { useRouteLoaderData } from "@remix-run/react";
import { Box, Callout, Flex } from "gestalt";
import { ContactLimitStatus } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";

export default function DashboardCallouts() {
  const rootData = useRouteLoaderData("root") as RootData;

  const idToCollect = !rootData?.store?.defaultListIdToCollectEmail;
  const brink =
    rootData?.store?.contactLimitStatus ===
    ContactLimitStatus.BrinkOfDissalwoed;
  const disallowed =
    rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed;

  return (
    <Flex direction="column" gap={4}>
      {!rootData?.store?.defaultListIdToCollectEmail && (
        <Callout
          iconAccessibilityLabel="error"
          message="Select a default list where your subscribers will be added to."
          type="error"
          primaryAction={{
            label: "Settings",
            accessibilityLabel: "setting",
            href: "/settings/p-s",
          }}
          title="Select a list"
        />
      )}
      {rootData?.store?.contactLimitStatus ===
        ContactLimitStatus.BrinkOfDissalwoed && (
        <Callout
          iconAccessibilityLabel="recommended"
          message="Your growing! Update your subscription for uninterupted growth."
          type="recommendation"
          primaryAction={{
            label: "Plan",
            accessibilityLabel: "plan",
            href: "/plan",
          }}
          title="Your Growing!"
        />
      )}
      {rootData?.store?.contactLimitStatus ===
        ContactLimitStatus.Disallowed && (
        <Callout
          iconAccessibilityLabel="error"
          message="Head over to subscription plan and see why it's paused."
          type="error"
          primaryAction={{
            label: "Plan",
            accessibilityLabel: "plan",
            href: "/plan",
          }}
          title="Subscription Paused!"
        />
      )}
      {brink || disallowed || idToCollect ? <Box marginBottom={8} /> : <Box />}
    </Flex>
  );
}
