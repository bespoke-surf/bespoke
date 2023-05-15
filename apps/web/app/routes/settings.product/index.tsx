import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import { Box, ComboBox, Flex, Heading, Icon, PageHeader, Text } from "gestalt";
import { useCallback, useState } from "react";
import { StoreCurrency } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
import { action } from "./action";
import { SettingsProductActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export { action };

const currencyValues = ["USD", "INR", "AED", "AUD", "EUR", "GBP", "JPY"];

const currencySubtext = [
  "United States Dollar",
  "Indian Rupee",
  "Emirati Dirham",
  "Australian Dollar",
  "Euro",
  "British Pound Sterling",
  "Japanese Yen",
];

const currencyLabels = [
  "$ / USD",
  "₹ / INR",
  "د.إ / AED",
  "A$ / AUD",
  "€ / EUR",
  "£ / GBP",
  "¥ / JPY",
];

const usStatesOptions: ComboBoxItemType[] = currencyValues.map(
  (pronoun, index) => ({
    label: currencyLabels[index] ?? "",
    value: pronoun,
    subtext: currencySubtext[index],
  })
);

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Products Settings - Settings | ${rootData.store?.name}`,
    description: "Settings related to the product section.",
  };
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  return null;
}

export default function StoreSettings() {
  const rootData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();

  const [suggestedOptions, setSuggestedOptions] = useState(usStatesOptions);
  const [inputValue, setInputValue] = useState(
    usStatesOptions.find(({ value }) => value === rootData?.store?.currency)
      ?.label
  );

  const [selected, setSelected] = useState<any | undefined>(
    usStatesOptions.find(({ value }) => value === rootData?.store?.currency)
  );

  const handleOnChange = useCallback(({ value }: { value: string }) => {
    setSelected(undefined);
    if (value && currencyValues.includes(value)) {
      setInputValue(value);
      const filteredOptions = usStatesOptions.filter((item) =>
        item.label?.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      setSuggestedOptions(usStatesOptions);
    }
  }, []);

  const handleUpdate = useCallback(
    (selected: any) => {
      if (!rootData?.store?.id) return;
      const charAtZero = selected.value.charAt(0);
      const lowerCasedChar = selected.value.slice(1).toLowerCase();
      //@ts-ignore
      const currency = StoreCurrency[charAtZero + lowerCasedChar];
      const formData = new FormData();
      formData.append("_action", SettingsProductActionEnum.updateCurrency);
      formData.append("currency", currency);
      formData.append("storeId", rootData?.store?.id);
      fetcher.submit(formData, { method: "patch" });
    },
    [fetcher, rootData?.store?.id]
  );

  const handleSelect = useCallback(
    ({ item }: { item: any }) => {
      setInputValue(item.label);
      setSuggestedOptions(usStatesOptions);
      setSelected(item);
      handleUpdate(item);
    },
    [handleUpdate]
  );

  return (
    <>
      <Flex justifyContent="start" alignItems="center" gap={2}>
        <Link to="..">
          <Text underline size="100">
            Settings
          </Text>
        </Link>

        <Icon
          accessibilityLabel="arrow-right"
          size={10}
          icon="arrow-forward"
          color="dark"
        />
        <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
          <Text size="100">Product Settings</Text>
        </Box>
      </Flex>
      <PageHeader
        borderStyle="none"
        title="Product Settings"
        subtext="Settings related to the product section."
      />
      <Flex justifyContent="center">
        <Box width="91.5%" paddingY={6}>
          <Flex gap={6} direction="column">
            <Flex gap={2} direction="column">
              <Heading size="300">Currency</Heading>
              <Text size="300">Change your product currency</Text>
            </Flex>
            <Flex gap={2} alignItems="center">
              <ComboBox
                label=""
                accessibilityClearButtonLabel="Clear the current value"
                id="uncontrolled"
                noResultText="currency not available"
                placeholder="Your store currency"
                size="lg"
                inputValue={inputValue}
                options={suggestedOptions}
                onBlur={() => {
                  if (!selected) setInputValue("");
                  setSuggestedOptions(usStatesOptions);
                }}
                onClear={() => {
                  setInputValue("");
                  setSelected(undefined);
                  setSuggestedOptions(usStatesOptions);
                }}
                selectedOption={selected}
                onChange={handleOnChange}
                onSelect={handleSelect}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
