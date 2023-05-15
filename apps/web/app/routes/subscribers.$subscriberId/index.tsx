import { Avatar, Box, Datapoint, Flex, Icon, PageHeader, Text } from "gestalt";

import {
  Link,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";
import getSymbolFromCurrency from "currency-symbol-map";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { loader } from "./loader";
import type { SubscribersSubscriberData } from "./types";

export { loader };
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData, data }) => {
  const rootData = parentsData.root as RootData;
  const loaderData = data as SubscribersSubscriberData;

  return {
    title: `${loaderData.subscriber?.user.email} - Subscribers | ${rootData.store?.name}`,
    description: `${loaderData.subscriber?.user.email}`,
  };
};

export default function Subscriber() {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<SubscribersSubscriberData>();

  return (
    <>
      <Flex justifyContent="start" alignItems="center" gap={2}>
        <Link to="..">
          <Text underline size="100">
            Subscribers
          </Text>
        </Link>
        <Icon
          accessibilityLabel="arrow-right"
          size={10}
          icon="arrow-forward"
          color="dark"
        />
        <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
          <Text size="100">{loaderData.subscriber?.user.email}</Text>
        </Box>
      </Flex>
      <PageHeader
        borderStyle="none"
        thumbnail={
          <Avatar
            name={
              loaderData.subscriber?.firstName
                ? loaderData.subscriber.firstName
                : loaderData.subscriber?.user.email ?? ""
            }
          />
        }
        title={
          loaderData.subscriber?.firstName
            ? `${loaderData.subscriber.firstName} ${
                loaderData.subscriber.lastName ?? ""
              }`
            : loaderData.subscriber?.user.email ?? ""
        }
        subtext={
          loaderData.subscriber?.firstName
            ? loaderData.subscriber.user.email
            : undefined
        }
        items={[
          <Datapoint
            key="revenue"
            size="md"
            title="Revenue"
            value={`${
              !loaderData.subscriberRevenue
                ? "-"
                : `${getSymbolFromCurrency(rootData?.store?.currency ?? "")} ${
                    loaderData.subscriberRevenue / 100
                  }`
            }`}
          />,
        ]}
      />
      <Flex justifyContent="center">
        <Box paddingY={6} width="92.5%">
          <Flex justifyContent="center">
            <Box width="97.5%">
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
