import { Await, useLoaderData } from "@remix-run/react";
import {
  Box,
  Column,
  Datapoint,
  Flex,
  Heading,
  IconButton,
  Tooltip,
} from "gestalt";
import { Suspense } from "react";
import type { GetStoreEmailMetricQuery } from "../../graphql/__generated__/graphql";
import Benchmark from "./analytics/Benchmark";
import type { DashboardIndexData } from "./types";

export default function Analytics() {
  const loaderData = useLoaderData() as DashboardIndexData;
  return (
    <Flex alignItems="stretch" justifyContent="start" wrap>
      <Column span={12} smSpan={6} mdSpan={7} lgSpan={7}>
        <Box marginEnd={4}>
          <Benchmark />
        </Box>
      </Column>
      <Column span={12} smSpan={6} mdSpan={5} lgSpan={5}>
        <Box borderStyle="sm" padding={6} rounding={4}>
          <Flex justifyContent="between" alignItems="center">
            <Heading size="500">Metrics</Heading>
            <Tooltip text="Activity Feed">
              <IconButton
                size="md"
                href="/activity-feed"
                role="link"
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
      </Column>
    </Flex>
  );
}

const MetricData = ({
  data,
}: {
  data?: GetStoreEmailMetricQuery | undefined;
}) => {
  return (
    <Flex gap={4} justifyContent="between" direction="column">
      <Flex gap={4} justifyContent="between">
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
      </Flex>
      <Flex gap={4} justifyContent="between">
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
    </Flex>
  );
};
