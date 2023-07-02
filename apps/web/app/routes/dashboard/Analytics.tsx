import { Await, useLoaderData } from "@remix-run/react";
import {
  Box,
  Datapoint,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "gestalt";
import { Suspense } from "react";
import type { GetStoreEmailMetricQuery } from "../../graphql/__generated__/graphql";
import type { DashboardIndexData } from "./types";

export default function Analytics() {
  const loaderData = useLoaderData() as DashboardIndexData;
  return (
    <Box color="elevationAccent" padding={6} rounding={4}>
      <Flex justifyContent="between" alignItems="center">
        <Flex direction="column" gap={1}>
          <Heading size="500">Performance</Heading>
          <Text color="subtle" size="200">
            Showing metrics data
          </Text>
        </Flex>
        <Tooltip text="Activity Feed">
          <IconButton
            size="md"
            href="/activity-feed"
            role="link"
            bgColor="white"
            accessibilityLabel="lists"
            icon="history"
          />
        </Tooltip>
      </Flex>
      <Box marginBottom={6} />
      <Suspense fallback={<MetricData />}>
        <Await resolve={loaderData.emailMetricPromise}>
          {(emailMetric) => <MetricData data={emailMetric} />}
        </Await>
      </Suspense>
    </Box>
  );
}

const MetricData = ({
  data,
}: {
  data?: GetStoreEmailMetricQuery | undefined;
}) => {
  return (
    <Flex gap={{ row: 4, column: 4 }} wrap justifyContent="between">
      <Datapoint
        title="Opened"
        value={`${data?.getStoreEmailMetric?.opened ?? "-"}`}
        trend={{
          accessibilityLabel: "opened",
          value: data?.getStoreEmailMetric?.openedTrend ?? 0,
        }}
        size="lg"
        tooltipText="Email opened. Measuring daily trends."
      />

      <Datapoint
        title="Contacts"
        value={`${data?.getStoreEmailMetric?.contact ?? "-"}`}
        size="lg"
        tooltipText="Total contacts"
      />
      <Datapoint
        title="Clicked"
        value={`${data?.getStoreEmailMetric?.clicked ?? "-"}`}
        trend={{
          accessibilityLabel: "clicked",
          value: data?.getStoreEmailMetric?.clickedTrend ?? 0,
        }}
        size="lg"
        tooltipText="Links clicked in an email. Measuring daily trends."
      />
      <Datapoint
        title="Delivered"
        value={`${data?.getStoreEmailMetric?.delivered ?? "-"}`}
        trend={{
          accessibilityLabel: "delivered",
          value: data?.getStoreEmailMetric?.deliveredTrend ?? 0,
        }}
        size="lg"
        tooltipText="Emails that got deliverd. Measuring daily trends."
      />
    </Flex>
  );
};
