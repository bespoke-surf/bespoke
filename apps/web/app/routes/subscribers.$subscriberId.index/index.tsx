import { useRouteLoaderData } from "@remix-run/react";
import { Flex, Heading, Text } from "gestalt";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { SubscribersSubscriberData } from "../subscribers.$subscriberId/types";
import EmailActivity from "./EmailActivity";
import { loader } from "./loader";
import Metrics from "./Metrics";
import RevenueActivity from "./RevenueActivity";
export { loader };
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export default function SubscribersSubscriberIndex() {
  const loaderData = useRouteLoaderData(
    "routes/subscribers.$subscriberId/index"
  ) as SubscribersSubscriberData;

  return (
    <Flex direction="column" gap={{ column: 12, row: 0 }}>
      <Flex direction="column" gap={{ column: 8, row: 0 }}>
        <Flex direction="column" gap={{ column: 0, row: 2 }}>
          <Heading size="400">Contact information</Heading>
          <Text>Showing subscriber location and phone number</Text>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text size="400" weight="bold">
            Location
          </Text>
          <Text>
            {loaderData?.formattedAddress === ""
              ? "-"
              : loaderData?.formattedAddress}
          </Text>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text size="400" weight="bold">
            Phone number
          </Text>
          <Text>
            {loaderData?.subscriber?.phoneNumber
              ? loaderData.subscriber.phoneNumber
              : "-"}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap={{ column: 8, row: 0 }}>
        <Flex direction="column" gap={{ column: 0, row: 2 }}>
          <Heading size="400">Activity and metrics</Heading>
          <Text>Showing subscriber activity and metrics</Text>
        </Flex>

        <EmailActivity />
        <RevenueActivity />
        <Metrics />
      </Flex>
    </Flex>
  );
}
