import { useFormikContext } from "formik";
import { Flex, SelectList, TextField } from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterTextValue,
} from "../../../../../graphql/__generated__/graphql";
import { BaseTriggerFilterTextValueExpressionEnum } from "../../../../../graphql/__generated__/graphql";
import { triggerFilterTextValueExpressionSelectOption } from "../../../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../../../types";

const textValueSelectOption = triggerFilterTextValueExpressionSelectOption.map(
  ({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  )
);

export default function TextType({
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
    value?.__typename === "BaseTriggerFilterTextValue"
      ? value.textExpression
      : undefined;

  const expressionValue =
    value?.__typename === "BaseTriggerFilterTextValue"
      ? value.textValue
      : undefined;

  const handleExpressionChange = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        if (parentData) {
          if (
            value === BaseTriggerFilterTextValueExpressionEnum.IsSet ||
            value === BaseTriggerFilterTextValueExpressionEnum.IsNotSet
          ) {
            parentData[currentIndex] = {
              ...parentData[currentIndex],
              value: {
                ...parentData[currentIndex]?.value,
                textValue: undefined,
                textExpression:
                  value as BaseTriggerFilterTextValueExpressionEnum,
              } as BaseTriggerFilterTextValue,
            };
          } else {
            parentData[currentIndex] = {
              ...parentData[currentIndex],
              value: {
                ...parentData[currentIndex]?.value,
                textExpression:
                  value as BaseTriggerFilterTextValueExpressionEnum,
              } as BaseTriggerFilterTextValue,
            };
          }
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handleExpressionValue = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        if (parentData) {
          parentData[currentIndex] = {
            ...parentData[currentIndex],
            value: {
              ...parentData[currentIndex]?.value,
              textValue: value,
            } as BaseTriggerFilterTextValue,
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
        value={expression ? expression : undefined}
        placeholder="Select an expression...."
        size="lg"
        errorMessage={
          (
            (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value as BaseTriggerFilterTextValue
          )?.textExpression
            ? ((
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterTextValue
              )?.textExpression as string)
            : undefined
        }
      >
        {textValueSelectOption}
      </SelectList>
      {expression === BaseTriggerFilterTextValueExpressionEnum.IsSet ||
      expression ===
        BaseTriggerFilterTextValueExpressionEnum.IsNotSet ? null : (
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
              ]?.[currentIndex]?.value as BaseTriggerFilterTextValue
            )?.textValue
              ? ((
                  (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.value as BaseTriggerFilterTextValue
                )?.textValue as string)
              : undefined
          }
        />
      )}
    </Flex>
  );
}
