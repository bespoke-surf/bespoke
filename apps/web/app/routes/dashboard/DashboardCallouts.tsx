import { useRouteLoaderData } from "@remix-run/react";
import { Box, Callout, Flex } from "gestalt";
import {
  ContactLimitStatus,
  EmailSentLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";

export default function DashboardCallouts() {
  const rootData = useRouteLoaderData("root") as RootData;

  const idToCollect = !rootData?.store?.defaultListIdToCollectEmail;

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
      {/* {rootData?.store?.contactLimitStatus ===
        ContactLimitStatus.BrinkOfDissalwoed ||
      rootData.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.BrinkOfDissalwoed ? (
        <Callout
          iconAccessibilityLabel="recommended"
          message="Your growing! Update your plan for uninterrupted growth."
          type="recommendation"
          primaryAction={{
            label: "Plan",
            accessibilityLabel: "plan",
            href: "/plan",
          }}
          title="Your Growing!"
        />
      ) : null} */}
      {rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed ||
      rootData.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.Disallowed ? (
        <Callout
          iconAccessibilityLabel="error"
          message="Head over to Plan tab and see what the issue is."
          type="error"
          primaryAction={{
            label: "Plan",
            accessibilityLabel: "plan",
            href: "/plan",
          }}
          title="Problem found at Plan!"
        />
      ) : null}

      {disallowed || idToCollect ? <Box marginBottom={8} /> : <Box />}
    </Flex>
  );
}
