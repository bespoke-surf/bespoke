import { useLoaderData } from "@remix-run/react";
import { Box, Datapoint, Flex, Heading } from "gestalt";
import type { SubscribersSubscriberIndexData } from "./types";

export default function EmailActivity() {
  const loaderData = useLoaderData<SubscribersSubscriberIndexData>();

  return (
    <Box>
      <Heading size="400">Email activity</Heading>
      <Box marginTop={4} marginBottom={6} />
      <Flex gap={12} alignItems="center" justifyContent="start">
        <Datapoint
          key="emails received"
          size="md"
          title="Emails received"
          value={`${
            !loaderData.emailReceivedCount ? "-" : loaderData.emailReceivedCount
          }`}
        />

        <Datapoint
          key="opened"
          size="md"
          title="Opened"
          value={`${
            !loaderData.emailOpenedCount ? "-" : loaderData.emailOpenedCount
          }`}
          // trend={
          //   !loaderData.emailOpenedCount
          //     ? undefined
          //     : {
          //         accessibilityLabel: "opened",
          //         value: Math.round(
          //           (loaderData.emailOpenedCount /
          //             (loaderData.emailReceivedCount ?? 0)) *
          //             100
          //         ),
          //       }
          // }
        />

        <Datapoint
          key="clicked"
          size="md"
          title="Links clicked"
          value={`${
            !loaderData.emailLinkClickedCount
              ? "-"
              : loaderData.emailLinkClickedCount
          }`}
          // trend={
          //   !loaderData.emailLinkClickedCount
          //     ? undefined
          //     : {
          //         accessibilityLabel: "link clicked",
          //         value: Math.round(
          //           (loaderData.emailLinkClickedCount /
          //             (loaderData.emailReceivedCount ?? 0)) *
          //             100
          //         ),
          //       }
          // }
        />
      </Flex>
    </Box>
  );
}
