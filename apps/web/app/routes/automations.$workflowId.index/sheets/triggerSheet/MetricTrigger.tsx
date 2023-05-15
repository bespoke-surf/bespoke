import { useLoaderData, useNavigate } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { ComboBoxItemType } from "gestalt";
import { Box, ComboBox, Flex, Text } from "gestalt";
import { useContext, useEffect, useState } from "react";
import { shopifyOptions } from "../../metricTypes";
import type { AutomationWorkflowIndexData } from "../../types";
import { NodeSheetContext } from "../NodeSheetProvider";
import type { MyTriggerSheetFormValues } from "../TriggerSheet";

export default function MetricTrigger({ loading }: { loading: boolean }) {
  const loaderData = useLoaderData<AutomationWorkflowIndexData>();
  const formik = useFormikContext<MyTriggerSheetFormValues>();

  const { state } = useContext(NodeSheetContext);
  const navigate = useNavigate();

  const [options, setOption] = useState<ComboBoxItemType[]>([
    {
      label: "Add new integration",
      value: "integrations",
      subtext: "navigates to Integration",
    },
  ]);
  const [selected, setSelected] = useState<ComboBoxItemType | undefined>(() => {
    if (
      state?.data?.value &&
      state.data?.value.__typename === "WorkflowStateMetricTriggerActivityValue"
    ) {
      return {
        label:
          shopifyOptions.find(({ value }) => value === state?.data?.name)
            ?.label ?? "",
        value: state.data?.value.metricType,
      };
    }
    return undefined;
  });

  useEffect(() => {
    if (loaderData.integration?.shopify?.authenticated) {
      setOption((pData) => [...shopifyOptions, ...pData]);
    }
  }, [loaderData.integration?.shopify?.authenticated]);

  const handleSelect = ({ item }: { item: ComboBoxItemType }) => {
    setSelected(item);
    if (item.value === "integrations") {
      navigate("/integrations");
    } else {
      formik.setFieldValue("metricType", item.value);
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Text inline weight="bold">
        METRIC TRIGGER
      </Text>
      <Box paddingX={1} paddingY={1}>
        <ComboBox
          size="lg"
          accessibilityClearButtonLabel="Clear the current value"
          label="Choose a metric to trigger this workflow"
          id="subtext"
          noResultText="No results found"
          options={options}
          inputValue={selected?.label}
          selectedOption={selected}
          placeholder="Choose metric..."
          onSelect={handleSelect}
          disabled={loading}
          errorMessage={
            formik.touched.listId && formik.errors.listId
              ? formik.errors.listId
              : undefined
          }
        />
      </Box>
    </Flex>
  );
}
