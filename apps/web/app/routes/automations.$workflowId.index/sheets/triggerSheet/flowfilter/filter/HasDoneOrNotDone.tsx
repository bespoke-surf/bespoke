import { useLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { ComboBoxItemType } from "gestalt";
import { ComboBox, Flex } from "gestalt";
import produce from "immer";
import { useCallback, useEffect, useState } from "react";
import type {
  BaseConditionalFilter,
  BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum,
} from "../../../../../../graphql/__generated__/graphql";
import {
  defaultFilterOptions,
  filtershopifyOptions,
} from "../../../../flowFilterTypes";

import type {
  AutomationWorkflowIndexData,
  FlowFilterFormikFormValues,
} from "../../../../types";
import Inequalities from "./hasDoneOrNotDone/Inequalities";
import Time from "./hasDoneOrNotDone/Time";

export default function HasDoneOrNotDone({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, errors } =
    useFormikContext<FlowFilterFormikFormValues>();

  const loaderData = useLoaderData<AutomationWorkflowIndexData>();
  const [options, setOptions] = useState(defaultFilterOptions);
  const [selected, setSelected] = useState<ComboBoxItemType | undefined>();

  const trigger =
    values?.flowFilter?.[parentIndex]?.[currentIndex]?.value?.trigger;

  useEffect(() => {
    if (
      trigger &&
      defaultFilterOptions.some(({ value }) => value === trigger)
    ) {
      setSelected({
        label:
          defaultFilterOptions.find(({ value }) => value === trigger)?.label ??
          "",
        value: trigger,
      });
    } else if (
      trigger &&
      filtershopifyOptions.some(({ value }) => value === trigger)
    ) {
      setSelected({
        label:
          filtershopifyOptions.find(({ value }) => value === trigger)?.label ??
          "",
        value: trigger,
      });
    }
  }, [trigger]);

  useEffect(() => {
    if (loaderData.integration?.shopify?.authenticated) {
      setOptions((prevData) => [...prevData, ...filtershopifyOptions]);
    }
  }, [loaderData.integration?.shopify?.authenticated]);

  const handleMetricChange = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      setSelected(item);
      const newState = produce(values.flowFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        if (parentData) {
          parentData[currentIndex] = {
            ...parentData[currentIndex],
            value: {
              ...parentData[currentIndex]?.value,
              trigger:
                item.value as BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum,
            },
          };
        }
      });
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <ComboBox
        size="lg"
        accessibilityClearButtonLabel="Clear category value"
        id="trigger"
        label="Choose metric..."
        labelDisplay="hidden"
        noResultText="No results for your selection"
        options={options}
        onSelect={handleMetricChange}
        inputValue={selected?.label}
        selectedOption={selected}
        placeholder="Choose metric..."
        errorMessage={
          (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
            parentIndex
          ]?.[currentIndex]?.value?.trigger
            ? ((errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value?.trigger as string)
            : undefined
        }
      />
      <Inequalities currentIndex={currentIndex} parentIndex={parentIndex} />
      <Time currentIndex={currentIndex} parentIndex={parentIndex} />
    </Flex>
  );
}
