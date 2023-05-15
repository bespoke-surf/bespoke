import { useFormikContext } from "formik";
import { Flex, NumberField, SelectList, TextField } from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterListValue,
} from "../../../../../graphql/__generated__/graphql";
import { BaseTriggerFilterListValueExpressionEnum } from "../../../../../graphql/__generated__/graphql";
import { triggerFilterListValueSelectOptions } from "../../../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../../../types";

const textValueSelectOption = triggerFilterListValueSelectOptions.map(
  ({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  )
);

export default function ListType({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, errors } =
    useFormikContext<TriggerFilterFormikFormValues>();

  const value = values.triggerFilter?.[parentIndex]?.[currentIndex]?.value;
  const expression =
    value?.__typename === "BaseTriggerFilterListValue"
      ? value.listExpression
      : undefined;

  const expressionValue =
    value?.__typename === "BaseTriggerFilterListValue"
      ? value.listValue
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
              listExpression: value as BaseTriggerFilterListValueExpressionEnum,
            } as BaseTriggerFilterListValue,
          };
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const valueChange = useCallback(
    (value: string | number) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        if (parentData) {
          parentData[currentIndex] = {
            ...parentData[currentIndex],
            value: {
              ...parentData[currentIndex]?.value,
              listValue: String(value),
            } as BaseTriggerFilterListValue,
          };
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handleExpressionValue = useCallback(
    ({ value }: { value: string }) => {
      valueChange(value);
    },
    [valueChange]
  );
  const handleExpressionValueNumber = useCallback(
    ({ value }: { value: number | undefined }) => {
      if (value) {
        valueChange(value);
      }
    },
    [valueChange]
  );

  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <SelectList
        name="expression"
        id="expression"
        onChange={handleExpressionChange}
        value={expression ? expression : undefined}
        placeholder="Select an expression...."
        size="lg"
        errorMessage={
          (
            (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value as BaseTriggerFilterListValue
          )?.listExpression
            ? ((
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterListValue
              )?.listExpression as string)
            : undefined
        }
      >
        {textValueSelectOption}
      </SelectList>

      {expression === BaseTriggerFilterListValueExpressionEnum.Contains ||
      expression === BaseTriggerFilterListValueExpressionEnum.DosentContain ? (
        <TextField
          id="value"
          onChange={handleExpressionValue}
          size="lg"
          autoComplete="off"
          name="value"
          placeholder="Dimension value"
          value={expressionValue ? expressionValue : undefined}
          errorMessage={
            (
              (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value as BaseTriggerFilterListValue
            )?.listValue
              ? ((
                  (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.value as BaseTriggerFilterListValue
                )?.listValue as string)
              : undefined
          }
        />
      ) : null}
      {expression === BaseTriggerFilterListValueExpressionEnum.HasAtleast ||
      expression === BaseTriggerFilterListValueExpressionEnum.HasAtmost ||
      expression === BaseTriggerFilterListValueExpressionEnum.HasMoreThan ||
      expression === BaseTriggerFilterListValueExpressionEnum.HasFewerThan ? (
        <NumberField
          id="value"
          onChange={handleExpressionValueNumber}
          size="lg"
          autoComplete="off"
          name="value"
          placeholder="Dimension value"
          value={expressionValue ? Number(expressionValue) : undefined}
          errorMessage={
            (
              (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value as BaseTriggerFilterListValue
            )?.listValue
              ? ((
                  (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.value as BaseTriggerFilterListValue
                )?.listValue as string)
              : undefined
          }
        />
      ) : null}
    </Flex>
  );
}
