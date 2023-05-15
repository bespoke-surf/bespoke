import { useFormikContext } from "formik";
import { Flex, SelectList } from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterBooleanValue,
} from "../../../../../graphql/__generated__/graphql";
import { triggerFilterBoolenValueExpressionSelectOptions } from "../../../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../../../types";

const textValueSelectOption =
  triggerFilterBoolenValueExpressionSelectOptions.map(({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  ));

export default function BooleanType({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, errors } =
    useFormikContext<TriggerFilterFormikFormValues>();

  const value = values.triggerFilter?.[parentIndex]?.[currentIndex]?.value;
  const expressionValue =
    value?.__typename === "BaseTriggerFilterBooleanValue"
      ? value.booleanValue
      : undefined;

  const handleExpressionChange = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        if (parentData) {
          parentData[currentIndex] = {
            ...parentData[currentIndex],
            value: {
              ...parentData[currentIndex]?.value,
              booleanValue: value === "true" ? true : false,
            } as BaseTriggerFilterBooleanValue,
          };
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <SelectList
        name="expression"
        id="expression"
        onChange={handleExpressionChange}
        value={
          expressionValue !== undefined
            ? expressionValue === true
              ? "true"
              : "false"
            : undefined
        }
        placeholder="Select an expression...."
        size="lg"
        errorMessage={
          (
            (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value as BaseTriggerFilterBooleanValue
          )?.booleanValue
            ? ((
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterBooleanValue
              )?.booleanValue as unknown as string)
            : undefined
        }
      >
        {textValueSelectOption}
      </SelectList>
    </Flex>
  );
}
