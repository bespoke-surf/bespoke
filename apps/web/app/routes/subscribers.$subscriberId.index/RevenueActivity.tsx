import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import getSymbolFromCurrency from "currency-symbol-map";
import { Box, Datapoint, Flex, Heading } from "gestalt";
import type { RootData } from "../../root";
import type { SubscribersSubscriberData } from "../subscribers.$subscriberId/types";
import type { SubscribersSubscriberIndexData } from "./types";

export default function RevenueActivity() {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<SubscribersSubscriberIndexData>();
  const parentLoader = useRouteLoaderData(
    "routes/subscribers.$subscriberId/index"
  ) as SubscribersSubscriberData;

  if (!loaderData.integration?.shopify?.authenticated) {
    return null;
  }

  return (
    <Box>
      <Heading size="400">Revenue activity</Heading>
      <Box marginTop={4} marginBottom={6} />
      <Flex gap={12} alignItems="center" justifyContent="start">
        <Datapoint
          key="emails received"
          size="md"
          title="Placed Order"
          value={`${
            !loaderData.placedOrderCount ? "-" : loaderData.placedOrderCount
          }`}
        />

        <Datapoint
          key="opened"
          size="md"
          title="Revenue"
          value={`${
            !parentLoader?.subscriberRevenue
              ? "-"
              : `${getSymbolFromCurrency(rootData?.store?.currency ?? "")} ${
                  parentLoader?.subscriberRevenue / 100
                }`
          }`}
        />

        <Datapoint
          key="clicked"
          size="md"
          title="Fulfiled Order"
          value={`${
            !loaderData.fulfilledOrderCount
              ? "-"
              : loaderData.fulfilledOrderCount
          }`}
        />
      </Flex>
    </Box>
  );
}
