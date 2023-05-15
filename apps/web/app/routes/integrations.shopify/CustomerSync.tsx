import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Flex,
  Layer,
  SlimBanner,
  Spinner,
  Text,
  Toast,
} from "gestalt";
import { useCallback, useEffect } from "react";
import ProgressBar from "~/components/ProgressBar";
import { EventState } from "~/graphql/__generated__/graphql";
import useEventStream from "~/hooks/useEventStream";
import { useTimeoutTrigger } from "~/hooks/useTimeoutTrigger";
import type { IntegrationShopifyData } from "./types";
import { IntegrationShopifyActionEnum } from "./types";

export default function CustomerSync() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<IntegrationShopifyData>();
  const shopifyProgress = useEventStream("shopify-customer-progress");
  const { state: toast, setState: setToast } = useTimeoutTrigger(4000);

  const shopifyEvent = useEventStream("shopify-customer");

  const finished =
    shopifyEvent?.data.state === EventState.Failed ||
    shopifyEvent?.data.state === EventState.Completed;

  useEffect(() => {
    if (finished) {
      setToast(true);
    }
  }, [finished, setToast]);

  const syncShopifyCustomers = useCallback(() => {
    if (!loaderData.integration?.shopify?.id) return;
    const formData = new FormData();
    formData.append(
      "_action",
      IntegrationShopifyActionEnum.syncShopifyCustomers
    );

    formData.append("shopifyId", loaderData.integration?.shopify?.id);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loaderData.integration?.shopify?.id]);

  const stopProductSync = useCallback(() => {
    if (!loaderData.integration?.shopify?.id) return;
    const formData = new FormData();
    formData.append(
      "_action",
      IntegrationShopifyActionEnum.stopShopifyCustomerSync
    );

    formData.append("shopifyId", loaderData.integration?.shopify?.id);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loaderData.integration?.shopify?.id]);

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Flex direction="column" gap={2}>
          <Text weight="bold">Customer Sync</Text>
          <Flex direction="column" gap={1}>
            <Text>Customers will get added to the Checkout list.</Text>
            <Text>
              New customers from Shopify store are auto synched and added to
              list.
            </Text>
          </Flex>
        </Flex>

        {loaderData.integration?.shopify?.customerSyncJobId && !finished ? (
          <Spinner accessibilityLabel="loading" show />
        ) : (
          <Flex gap={{ column: 2, row: 2 }} alignItems="end" wrap>
            <Button
              href="/subscribers"
              text="Subscribers"
              color="gray"
              size="lg"
              role="link"
            />

            <Button
              text="Sync"
              size="lg"
              accessibilityLabel="sync"
              color="red"
              onClick={syncShopifyCustomers}
              disabled={
                !loaderData.integration?.shopify?.authenticated ||
                loaderData.integration?.shopify.sessionExpired ||
                loaderData.integration.shopify.customerSyncJobId
                  ? true
                  : false ||
                    !loaderData.integration.shopify.listIdToCollectEmail
              }
            />
          </Flex>
        )}
      </Flex>
      <Box marginTop={4} />
      {!loaderData.integration?.shopify?.listIdToCollectEmail ? (
        <SlimBanner
          message="To enable customer sync, enable the 'Collect Subscribers' option above and 'select a list'."
          type="error"
          iconAccessibilityLabel="error"
        />
      ) : (
        <SlimBanner
          message="Syncing customers will also trigger automations if any."
          type="infoBare"
          iconAccessibilityLabel="info"
        />
      )}

      <Box marginTop={4} />

      {loaderData.integration?.shopify?.customerSyncJobId && !finished ? (
        <Flex direction="column" gap={2} justifyContent="start">
          <ProgressBar
            bgColor="#008753"
            baseBgColor="#F9F9F9"
            height="30px"
            completed={Math.ceil(
              !shopifyProgress?.data ? 0 : Number(shopifyProgress?.data.message)
            )}
          />
          <Flex.Item alignSelf="end">
            <Button
              text="Stop Sync"
              color="gray"
              size="lg"
              onClick={stopProductSync}
            />
          </Flex.Item>
        </Flex>
      ) : null}
      {toast && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            {shopifyEvent?.data.state === EventState.Completed && (
              <Toast
                text={shopifyEvent?.data.message}
                //@ts-ignore
                type="default"
              />
            )}

            {shopifyEvent?.data.state === EventState.Failed && (
              <Toast
                text={shopifyEvent?.data.message}
                //@ts-ignore
                type="error"
              />
            )}
          </Box>
        </Layer>
      )}
    </>
  );
}
