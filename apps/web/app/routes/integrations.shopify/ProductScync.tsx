import { useFetcher, useLoaderData } from "@remix-run/react";
import { Box, Button, Flex, Layer, Spinner, Text, Toast } from "gestalt";
import { useCallback, useEffect } from "react";
import ProgressBar from "~/components/ProgressBar";
import { EventState } from "~/graphql/__generated__/graphql";
import useEventStream from "~/hooks/useEventStream";
import { useTimeoutTrigger } from "~/hooks/useTimeoutTrigger";
import type { IntegrationShopifyData } from "./types";
import { IntegrationShopifyActionEnum } from "./types";

export default function ProductSync() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<IntegrationShopifyData>();
  const shopifyProgress = useEventStream("shopify-product-progress");
  const { state: toast, setState: setToast } = useTimeoutTrigger();

  const shopifyEvent = useEventStream("shopify-product");

  const finished =
    shopifyEvent?.data.state === EventState.Failed ||
    shopifyEvent?.data.state === EventState.Completed;
  useEffect(() => {
    if (finished) {
      setToast(true);
    }
  }, [finished, setToast]);

  const syncShopifyProducts = useCallback(() => {
    if (!loaderData.integration?.shopify?.id) return;
    const formData = new FormData();
    formData.append(
      "_action",
      IntegrationShopifyActionEnum.syncShopifyProducts
    );

    formData.append("shopifyId", loaderData.integration?.shopify?.id);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loaderData.integration?.shopify?.id]);

  const stopProductSync = useCallback(() => {
    if (!loaderData.integration?.shopify?.id) return;
    const formData = new FormData();
    formData.append(
      "_action",
      IntegrationShopifyActionEnum.stopShopifyProductSync
    );

    formData.append("shopifyId", loaderData.integration?.shopify?.id);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loaderData.integration?.shopify?.id]);

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Flex direction="column" gap={2}>
          <Text weight="bold" size="300">
            Products Sync
          </Text>
          <Flex direction="column" gap={1}>
            <Text>Products will get synched with Bespoke products.</Text>
            <Text>Only active products with images will get synced.</Text>
            <Text>Products gets updated on second sync.</Text>
          </Flex>
        </Flex>

        {loaderData.integration?.shopify?.productSyncJobId && !finished ? (
          <Spinner accessibilityLabel="loading" show />
        ) : (
          <Flex gap={{ column: 2, row: 2 }} alignItems="end" wrap>
            <Button
              href="/products"
              text="Products"
              color="gray"
              size="lg"
              role="link"
            />

            <Button
              text="Sync"
              accessibilityLabel="sync"
              color="red"
              size="lg"
              onClick={syncShopifyProducts}
              disabled={
                !loaderData.integration?.shopify?.authenticated ||
                loaderData.integration?.shopify.sessionExpired ||
                loaderData.integration.shopify.productSyncJobId
                  ? true
                  : false
              }
            />
          </Flex>
        )}
      </Flex>
      <Box marginTop={4} />
      <Flex direction="column">
        {loaderData.integration?.shopify?.productSyncJobId && !finished ? (
          <Flex direction="column" gap={2} justifyContent="start">
            <ProgressBar
              bgColor="#008753"
              baseBgColor="#F9F9F9"
              height="30px"
              completed={Math.ceil(
                !shopifyProgress?.data
                  ? 0
                  : Number(shopifyProgress?.data.message)
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
      </Flex>
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
