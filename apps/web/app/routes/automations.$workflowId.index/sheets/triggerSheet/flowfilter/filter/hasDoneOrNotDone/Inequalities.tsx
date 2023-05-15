import { useFormikContext } from "formik";
import { Flex, NumberField, SelectList } from "gestalt";
import produce from "immer";
import { useCallback, useEffect, useState } from "react";
import type { BaseConditionalFilter } from "../../../../../../../graphql/__generated__/graphql";
import { BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum } from "../../../../../../../graphql/__generated__/graphql";
import { inequlitieOptions } from "../../../../../flowFilterTypes";
import type { FlowFilterFormikFormValues } from "../../../../../types";

export default function Inequalities({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, touched, errors } =
    useFormikContext<FlowFilterFormikFormValues>();

  const parentData = values?.flowFilter?.[parentIndex];
  const expression = parentData?.[currentIndex]?.value?.inequality?.expression;

  const value = parentData?.[currentIndex]?.value?.inequality?.value;

  const [selectValue, setSelectValue] =
    useState<BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum>(
      expression ??
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce
    );

  useEffect(() => {
    if (expression) {
      setSelectValue(expression);
    }
  }, [expression]);

  const handlChangeExpression = useCallback(
    ({ value }: { value: string }) => {
      setSelectValue(
        value as BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum
      );
      const newState = produce(values.flowFilter, (draftState) => {
        const draftParentDate = draftState?.[parentIndex];
        const draftcurrentData = draftParentDate?.[currentIndex];
        if (draftcurrentData) {
          draftcurrentData.value = {
            ...draftcurrentData?.value,
            inequality: {
              ...draftcurrentData?.value?.inequality,
              expression:
                value as BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
            },
          };
        }
      });
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  const handleNumberField = useCallback(
    ({ value }: { value: number | undefined }) => {
      if (value !== undefined) {
        const newState = produce(values.flowFilter, (draftState) => {
          const draftParentDate = draftState?.[parentIndex];
          const draftcurrentData = draftParentDate?.[currentIndex];
          if (draftcurrentData) {
            draftcurrentData.value = {
              ...draftcurrentData.value,
              inequality: {
                ...draftcurrentData.value?.inequality,
                value: Number(value),
              },
            };
          }
        });

        setFieldValue("flowFilter", newState);
      }
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  return (
    <Flex gap={{ row: 1, column: 0 }}>
      <Flex.Item flex="grow">
        <SelectList
          name="expression"
          id="expression"
          placeholder="Select a condition..."
          onChange={handlChangeExpression}
          value={selectValue}
          size="lg"
          errorMessage={
            (touched.flowFilter as unknown as BaseConditionalFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value &&
            (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value?.inequality?.expression
              ? ((errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value?.inequality?.expression as string)
              : undefined
          }
        >
          {listOptionOfInequlalities}
        </SelectList>
      </Flex.Item>
      {selectValue !==
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.ZeroTimes &&
      selectValue !==
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce ? (
        <NumberField
          size="lg"
          id="value"
          onChange={handleNumberField}
          min={0}
          autoComplete="off"
          value={value ?? undefined}
          name="value"
          errorMessage={
            (touched.flowFilter as unknown as BaseConditionalFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value &&
            (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
              parentIndex
            ]?.[currentIndex]?.value?.inequality?.value
              ? "please enter a value"
              : undefined
          }
        />
      ) : null}
    </Flex>
  );
}

const listOptionOfInequlalities = inequlitieOptions.map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));
