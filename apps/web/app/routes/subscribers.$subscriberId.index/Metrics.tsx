import {
  useFetcher,
  useLoaderData,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import { Box, Callout, ComboBox, Flex, Spinner, Table, Text } from "gestalt";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import type { MetricFragment } from "../../graphql/__generated__/graphql";
import { calculateTimeWhile } from "../../utils/calculateTimeWhile";
import {
  ALL_METRIC_VALUE,
  defaultOptions,
  shopifyOptions,
} from "../automations.$workflowId.index/metricTypes";
import { WAYPOINT_TRIGGER_AT } from "../index/types";
import type { SubscribersSubscriberIndexData } from "./types";

export default function Metrics() {
  const { subscriberId } = useParams<{ subscriberId: string }>();
  const loaderData = useLoaderData<SubscribersSubscriberIndexData>();
  const [items, setItems] = useState<(typeof loaderData)["metrics"]>(
    loaderData.metrics ? loaderData.metrics : []
  );
  const [options, setOptions] = useState(defaultOptions);
  const [selectedOption, setSelectedOption] = useState<ComboBoxItemType>();
  const fetcher = useFetcher<SubscribersSubscriberIndexData>();
  const fetcher2 = useFetcher<SubscribersSubscriberIndexData>();

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
    if (loaderData.integration?.shopify?.authenticated) {
      setOptions((prevOption) => [...prevOption, ...shopifyOptions]);
    }
  }, [loaderData.integration?.shopify?.authenticated]);

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

  const handleOnSelect = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      setSelectedOption(item);
      fetcher.load(`/subscribers/${subscriberId}?index&type=${item.value}`);
    },
    [fetcher, subscriberId]
  );

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      if (!inView) return;
      if (type) {
        fetcher2.load(
          `/subscribers/${subscriberId}?index&type=${type}&skip=${items?.length}`
        );
      } else {
        fetcher2.load(
          `/subscribers/${subscriberId}?index&skip=${items?.length}`
        );
      }
    },
    [fetcher2, items?.length, type, subscriberId]
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
      {!metrics?.length || metrics.length == 0 ? (
        <Callout
          iconAccessibilityLabel=""
          message="Nothing happening yet"
          type="warning"
        />
      ) : (
        <Table accessibilityLabel="Activity feed table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{}</Table.HeaderCell>
              <Table.HeaderCell>{}</Table.HeaderCell>
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
  );
}

const MetricsRow = ({ metrics }: { metrics: MetricFragment }) => {
  return (
    <Table.Row key={metrics.id}>
      <Table.Cell>
        <Text color="subtle" size="200">
          {metrics.message}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text overflow="noWrap">{calculateTimeWhile(metrics.createdAt)}</Text>
      </Table.Cell>
    </Table.Row>
  );
};
