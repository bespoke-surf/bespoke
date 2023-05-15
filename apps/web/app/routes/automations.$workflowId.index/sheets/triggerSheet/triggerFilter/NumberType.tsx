import { useFormikContext } from "formik";
import { Flex, NumberField, SelectList } from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterNumberValue,
  BaseTriggerFilterNumberValueExpressionEnum,
} from "../../../../../graphql/__generated__/graphql";
import { triggerFilterNumberValueExpressionSelectOptions } from "../../../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../../../types";

const textValueSelectOption =
  triggerFilterNumberValueExpressionSelectOptions.map(({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  ));

export default function NumberType({
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
    value?.__typename === "BaseTriggerFilterNumberValue"
      ? value.numberExpression
      : undefined;

  const expressionValue =
    value?.__typename === "BaseTriggerFilterNumberValue"
      ? value.numberValue
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
              numberExpression:
                value as BaseTriggerFilterNumberValueExpressionEnum,
            } as BaseTriggerFilterNumberValue,
          };
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handleExpressionValue = useCallback(
    ({ value }: { value: number | undefined }) => {
      if (value !== undefined) {
        const newState = produce(values.triggerFilter, (draftState) => {
          const parentData = draftState?.[parentIndex];
          if (parentData) {
            parentData[currentIndex] = {
              ...parentData[currentIndex],
              value: {
                ...parentData[currentIndex]?.value,
                numberValue: value,
              } as BaseTriggerFilterNumberValue,
            };
          }
        });
        setFieldValue("triggerFilter", newState);
      }
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
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
            ]?.[currentIndex]?.value as BaseTriggerFilterNumberValue
          )?.numberExpression
            ? ((
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterNumberValue
              )?.numberExpression as string)
            : undefined
        }
      >
        {textValueSelectOption}
      </SelectList>
      <NumberField
        id="value"
        onChange={handleExpressionValue}
        size="lg"
        autoComplete="off"
        name="value"
        placeholder="value"
        value={expressionValue ?? undefined}
        errorMessage={
          (
            (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value as BaseTriggerFilterNumberValue
          )?.numberValue
            ? ((
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterNumberValue
              )?.numberValue as unknown as string)
            : undefined
        }
      />
    </Flex>
  );
}
