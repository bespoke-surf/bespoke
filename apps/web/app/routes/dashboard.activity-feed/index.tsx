import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import {
  Avatar,
  Box,
  Callout,
  ComboBox,
  Flex,
  Spinner,
  Table,
  Text,
} from "gestalt";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type {
  MetricFragment,
  MetricType,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { calculateTimeWhile } from "../../utils/calculateTimeWhile";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import {
  ALL_METRIC_VALUE,
  defaultOptions,
  shopifyOptions,
} from "../automations.$workflowId.index/metricTypes";
import type { DashboardActivityFeedData } from "./types";
import { DASHBOARD_SUBSCRIBER_METRIC_TAKE, WAYPOINT_TRIGGER_AT } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Activity Feed - Dashboard | ${rootData.store?.name}`,
    description: "Your metrics activity feed",
  };
};

export async function loader({ request }: LoaderArgs) {
  try {
    const isPrivate = await isPrivateRoute(request);
    if (isPrivate == false) {
      return redirect("/");
    }

    const subdomain = getSubdomain(request);
    if (!subdomain) return redirect("/");
    const parsedUrl = new URL(request.url).searchParams;

    // const skip = Number(new URL(request.url).searchParams.get("skip")) || 0;
    const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;
    const type = parsedUrl.get("type")
      ? (parsedUrl.get("type") as MetricType)
      : ALL_METRIC_VALUE;

    const response = await Promise.all([
      sdk.GetMetricsByType(
        {
          take: DASHBOARD_SUBSCRIBER_METRIC_TAKE,
          skip,
          subdomain,
          metricType: type === ALL_METRIC_VALUE ? undefined : type,
          allMetric: type === ALL_METRIC_VALUE ? true : false,
        },
        { request }
      ),
      sdk.GetIntegrationWithSubdomain(
        {
          subdomain,
        },
        {
          request,
        }
      ),
    ]);
    const subscriberMetric = response[0];
    const integrations = response[1];

    return json<DashboardActivityFeedData>({
      metrics: subscriberMetric.getMetricsByType,
      integrations: integrations.getIntegrationWithSubdomain,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default function ActivityFeed() {
  const loaderData = useLoaderData<DashboardActivityFeedData>();
  const [items, setItems] = useState<(typeof loaderData)["metrics"]>(
    loaderData.metrics ?? []
  );
  const [options, setOptions] = useState(defaultOptions);
  const [selectedOption, setSelectedOption] = useState<ComboBoxItemType>();
  const fetcher = useFetcher<DashboardActivityFeedData>();
  const fetcher2 = useFetcher<DashboardActivityFeedData>();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const loading =
    fetcher.state === "loading" ||
    fetcher.state === "submitting" ||
    fetcher2.state === "loading" ||
    fetcher2.state === "submitting";
  useEffect(() => {
    if (fetcher.data) {
      setItems([...(fetcher.data?.metrics ?? [])]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher2.data) {
      setItems((prevData) => [
        ...(prevData ?? []),
        ...(fetcher2.data?.metrics ?? []),
      ]);
    }
  }, [fetcher2.data]);

  useEffect(() => {
    if (!type) {
      setSelectedOption({
        label: "All Metrics",
        value: ALL_METRIC_VALUE,
      });
    } else {
      let label: ComboBoxItemType | undefined;
      label = defaultOptions.find(({ value }) => value === type);
      if (label === undefined) {
        label = shopifyOptions.find(({ value }) => value === type);
      }
      if (label) {
        setSelectedOption(label);
      }
    }
  }, [type]);

  useEffect(() => {
    if (loaderData.integrations?.shopify?.authenticated) {
      setOptions((prevOption) => [...prevOption, ...shopifyOptions]);
    }
  }, [loaderData.integrations?.shopify?.authenticated]);

  const handleOnSelect = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      setSelectedOption(item);
      fetcher.load(`/dashboard/activity-feed?type=${item.value}`);
    },
    [fetcher]
  );

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      if (!inView) return;
      if (type) {
        fetcher2.load(
          `/dashboard/activity-feed?type=${type}&skip=${items?.length}`
        );
      } else {
        fetcher2.load(`/dashboard/activity-feed?skip=${items?.length}`);
      }
    },
    [fetcher2, items?.length, type]
  );

  const metrics = useMemo(
    () =>
      items?.map((metrics, index) => (
        <React.Fragment key={metrics.id}>
          <MetricsRow metrics={metrics as MetricFragment} key={metrics.id} />
          <ClientOnly>
            {() => (
              <>
                {index === items.length - WAYPOINT_TRIGGER_AT && (
                  <InView onChange={handleFetchMore} />
                )}
              </>
            )}
          </ClientOnly>
        </React.Fragment>
      )),
    [handleFetchMore, items]
  );

  return (
    <>
      <Flex justifyContent="center">
        <Box width="100%" paddingY={6}>
          <Flex gap={4} direction="column">
            <ComboBox
              size="lg"
              options={options}
              inputValue={selectedOption?.label}
              selectedOption={selectedOption}
              accessibilityClearButtonLabel="Clear the current value"
              label="Showing feed for"
              id="activity-feed"
              noResultText="No results for your selection"
              onSelect={handleOnSelect}
            />
            {!metrics?.length || metrics?.length == 0 ? (
              <Callout
                iconAccessibilityLabel=""
                message="Nothing happening yet"
                type="warning"
              />
            ) : (
              <Table accessibilityLabel="Activity feed table">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>{metrics}</Table.Body>
              </Table>
            )}
            <Flex justifyContent="center">
              <Box>
                <Spinner accessibilityLabel="loading" show={loading} />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

const MetricsRow = ({ metrics }: { metrics: MetricFragment }) => {
  return (
    <>
      <Table.Row key={metrics.id}>
        <Table.Cell>
          <Flex gap={2} alignItems="center">
            <Avatar name={metrics?.subscriber?.user?.email ?? ""} size="sm" />
            <Flex direction="column" gap={2}>
              <Link to={`/subscribers/${metrics?.subscriber?.id}`}>
                <Text underline>{metrics.subscriber?.user.email}</Text>
              </Link>
              <Text color="subtle" size="200">
                {metrics.message}
              </Text>
            </Flex>
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Text overflow="noWrap">{calculateTimeWhile(metrics.createdAt)}</Text>
        </Table.Cell>
      </Table.Row>
    </>
  );
};
