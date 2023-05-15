import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import { ComboBox, Flex, Text } from "gestalt";
import { useCallback, useEffect, useState } from "react";
import type { IntegrationShopifyData } from "./types";
import { IntegrationShopifyActionEnum } from "./types";

export default function Subscriptions() {
  const loaderData = useLoaderData<IntegrationShopifyData>();
  const syncAvailabe =
    loaderData.integration?.shopify?.authenticated &&
    loaderData.integration.shopify.sessionExpired === false;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [switched, setSwitched] = useState(
    loaderData.integration?.shopify?.listIdToCollectEmail ? true : false
  );

  const [options, setOption] = useState<ComboBoxItemType[]>([]);
  const [selected, setSelected] = useState<ComboBoxItemType | undefined>(
    undefined
  );

  useEffect(() => {
    if (loaderData.integration?.shopify?.listIdToCollectEmail) {
      const option = loaderData.lists?.find(
        ({ id }) => id === loaderData.integration?.shopify?.listIdToCollectEmail
      );
      if (option) {
        setSelected({
          label: option.name,
          value: loaderData.integration?.shopify?.listIdToCollectEmail,
        });
      }
    } else {
      setSelected(undefined);
    }
  }, [loaderData.integration?.shopify?.listIdToCollectEmail, loaderData.lists]);

  useEffect(() => {
    if (loaderData.lists) {
      const op: ComboBoxItemType[] = loaderData.lists?.map((list) => ({
        label: list.name,
        value: list.id,
      }));
      // op.push({
      //   label: "Create a new list",
      //   value: "create-list",
      //   subtext: "navigates to Lists",
      // });

      setOption(op);
    }
  }, [loaderData.lists]);

  const handleListToCollect = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      if (item.value === "create-list")
        return navigate("/subscriber-lists/create-list");
      if (!loaderData.integration?.shopify?.id) return;
      const formData = new FormData();
      formData.append("shopifyId", loaderData.integration?.shopify?.id);
      formData.append(
        "_action",
        IntegrationShopifyActionEnum.collectEmailSubscribers
      );
      formData.append("listId", item.value);
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, loaderData.integration?.shopify?.id, navigate]
  );

  // const handleSwitchChange = useCallback(() => {
  //   if (!switched) {
  //     setSwitched(true);
  //   } else {
  //     if (!loaderData.integration?.shopify?.id) return;
  //     const formData = new FormData();
  //     formData.append("shopifyId", loaderData.integration?.shopify?.id);
  //     formData.append(
  //       "_action",
  //       IntegrationShopifyActionEnum.removeCollectEmailSubscribers
  //     );
  //     fetcher.submit(formData, { method: "post" });
  //     setSwitched(false);
  //   }
  // }, [fetcher, loaderData.integration?.shopify?.id, switched]);

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2}>
        <Text weight="bold" size="400">
          Collect Customers
        </Text>
        <Text>
          Collect customers who opt-in via Shopify, such as during checkout or
          with a Shopify footer form.
        </Text>
      </Flex>

      <Flex justifyContent="between" alignItems="center">
        {/* <Text weight="bold">Collect Customers</Text> */}
        <ComboBox
          size="lg"
          accessibilityClearButtonLabel="Clear the current value"
          label="The list your customers are collected to"
          id="subtext"
          noResultText="No results found"
          options={options}
          inputValue={selected?.label}
          selectedOption={selected}
          helperText="You cannot change the list."
          // onSelect={handleListToCollect}
          placeholder="Select a list"
          disabled={!switched || !syncAvailabe}
        />
        {/* <Switch
          switched={switched}
          onChange={handleSwitchChange}
          id="collect email"
          disabled={!syncAvailabe}
        /> */}
      </Flex>
    </Flex>
  );
}
