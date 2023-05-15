import { useFormikContext } from "formik";
import { Box, Button, Flex, IconButton, SelectList } from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type { BaseConditionalFilter } from "../../../../../graphql/__generated__/graphql";
import {
  BaseConditionalFilterConditionEnum,
  BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
  BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
} from "../../../../../graphql/__generated__/graphql";
import type { FlowFilterFormikFormValues } from "../../../types";
import HasDoneOrNotDone from "./filter/HasDoneOrNotDone";

const conditionSelectOptions = [
  {
    label: "What someone has done (or not done)",
    value: BaseConditionalFilterConditionEnum.HasDoneOrNotDone,
  },
  // {
  //   label: "If someone is in or not in a list",
  //   value: BaseConditionalFilterConditionEnum.IsInListOrNot,
  // },
  // {
  //   label: "Has not been in this flow",
  //   value: BaseConditionalFilterConditionEnum.HasNotBeenInThisFlow,
  // },
].map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));

export default function Filter({
  parentIndex,
  currentIndex,
}: {
  parentIndex: number;
  currentIndex: number;
}) {
  const { setFieldValue, values, errors, touched } =
    useFormikContext<FlowFilterFormikFormValues>();

  const parenData = values?.flowFilter?.[parentIndex];

  const condition =
    values?.flowFilter?.[parentIndex]?.[currentIndex]?.condition;

  const handleRemoveCurrentCondtion = useCallback(() => {
    const newState = produce(values.flowFilter, (draftState) => {
      draftState?.[parentIndex]?.splice(currentIndex, 1);
      if (draftState?.[parentIndex]?.length === 0) {
        draftState.splice(parentIndex, 1);
      }
    });
    if (newState?.length === 0) {
      setFieldValue("flowFilter", null);
    } else {
      setFieldValue("flowFilter", newState);
    }
  }, [currentIndex, parentIndex, setFieldValue, values]);

  const handleAddAnotherCondition = useCallback(() => {
    // const currentArray = values.flowFilter?.[parentIndex];
    const newState = produce(values.flowFilter, (draftState) => {
      draftState?.[parentIndex]?.push({});
    });

    // if (values.flowFilter && newState) {
    //   values.flowFilter[parentIndex] = newState;
    // }
    setFieldValue("flowFilter", newState);
  }, [parentIndex, setFieldValue, values.flowFilter]);

  const handlChangeCondtion = useCallback(
    ({ value }: { value: string }) => {
      // const currentArray = values.flowFilter?.[parentIndex];
      const newState = produce(values.flowFilter, (draftState) => {
        if (
          draftState?.[parentIndex] &&
          (value as BaseConditionalFilterConditionEnum) ===
            BaseConditionalFilterConditionEnum.HasDoneOrNotDone
        ) {
          const parentData = draftState[parentIndex];
          if (parentData) {
            parentData[currentIndex] = {
              condition: value as BaseConditionalFilterConditionEnum,
              value: {
                inequality: {
                  expression:
                    BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce,
                },
                time: {
                  expression:
                    BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.OverAllTime,
                  date1: null,
                  date2: null,
                },
              },
            };
          }
        }
      });
      // if (values.flowFilter && newState) {
      //   values.flowFilter[parentIndex] = newState;
      // }
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  return (
    <Box marginBottom={3}>
      <Flex gap={{ column: 8, row: 0 }} direction="column">
        <Flex gap={{ column: 2, row: 0 }} direction="column">
          <SelectList
            name="conditions"
            id="conditions"
            placeholder="Select a condition..."
            onChange={handlChangeCondtion}
            value={condition ? condition : undefined}
            size="lg"
            errorMessage={
              (touched.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex] &&
              (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.condition
                ? ((
                    errors.flowFilter as unknown as BaseConditionalFilter[][]
                  )?.[parentIndex]?.[currentIndex]?.condition as string)
                : undefined
            }
          >
            {conditionSelectOptions}
          </SelectList>

          {condition ===
            BaseConditionalFilterConditionEnum.HasDoneOrNotDone && (
            <HasDoneOrNotDone
              currentIndex={currentIndex}
              parentIndex={parentIndex}
            />
          )}
        </Flex>
        <Flex justifyContent="between" alignItems="center">
          {parenData?.length !== undefined &&
          currentIndex === parenData.length - 1 ? (
            <Button text="OR" onClick={handleAddAnotherCondition} />
          ) : (
            <Button text="OR" disabled />
          )}
          <IconButton
            icon="trash-can"
            iconColor="darkGray"
            accessibilityLabel="trash can"
            size="md"
            onClick={handleRemoveCurrentCondtion}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
