import { useFormikContext } from "formik";
import { Box, Button, Flex, IconButton, SelectList } from "gestalt";
import produce from "immer";
import { useCallback, useContext } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterListValue,
  BaseTriggerFilterNumberValue,
  BaseTriggerFilterTextValue,
} from "../../../../../graphql/__generated__/graphql";
import {
  BaseTriggerFilterDateValueExpressionEnum,
  BaseTriggerFilterDimensionEnum,
  BaseTriggerFilterListValueExpressionEnum,
  BaseTriggerFilterNumberValueExpressionEnum,
  BaseTriggerFilterTextValueExpressionEnum,
  BaseTriggerFilterTypeEnum,
  DelayTypeEnum,
  MetricType,
} from "../../../../../graphql/__generated__/graphql";
import {
  filterTypeSelectOptions,
  triggerFilterDefaultSelectOpitons,
  triggerFilterOrderedProductSelectOptions,
  triggerFilterRefundedOrderSelectOptions,
} from "../../../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../../../types";
import { NodeSheetContext } from "../../NodeSheetProvider";
import BooleanType from "./BooleanType";
import DateType from "./DateType";
import ListType from "./ListType";
import NumberType from "./NumberType";
import TextType from "./TextType";

const typeSelectionOptions = filterTypeSelectOptions.map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));
const orderedProductSelectOptions =
  triggerFilterOrderedProductSelectOptions.map(({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  ));

const defaultSelectOpitons = triggerFilterDefaultSelectOpitons.map(
  ({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  )
);
const refundedOrderSelectOptions = triggerFilterRefundedOrderSelectOptions.map(
  ({ label, value }) => (
    <SelectList.Option key={label} label={label} value={value} />
  )
);

export default function Filter({
  parentIndex,
  currentIndex,
}: {
  parentIndex: number;
  currentIndex: number;
}) {
  const { setFieldValue, values, errors, touched } =
    useFormikContext<TriggerFilterFormikFormValues>();

  const { state } = useContext(NodeSheetContext);

  const parenData = values?.triggerFilter?.[parentIndex];

  const metricType =
    state?.data?.value?.__typename === "WorkflowStateMetricTriggerActivityValue"
      ? state.data.value.metricType
      : undefined;

  const defaultSelect =
    metricType !== MetricType.ShopifyRefundedOrder &&
    metricType !== MetricType.ShopifyOrderedProduct;
  const orderProductSelect = metricType === MetricType.ShopifyOrderedProduct;
  const refundeOrderSelect = metricType === MetricType.ShopifyRefundedOrder;

  const dimension =
    values?.triggerFilter?.[parentIndex]?.[currentIndex]?.dimension;
  const type = values?.triggerFilter?.[parentIndex]?.[currentIndex]?.type;

  const handleRemoveCurrentCondtion = useCallback(() => {
    const newState = produce(values.triggerFilter, (draftState) => {
      draftState?.[parentIndex]?.splice(currentIndex, 1);
      if (draftState?.[parentIndex]?.length === 0) {
        draftState.splice(parentIndex, 1);
      }
    });
    if (newState?.length === 0) {
      setFieldValue("triggerFilter", null);
    } else {
      setFieldValue("triggerFilter", newState);
    }
  }, [currentIndex, parentIndex, setFieldValue, values]);

  const handleAddAnotherCondition = useCallback(() => {
    const newState = produce(values.triggerFilter, (draftState) => {
      draftState?.[parentIndex]?.push({
        type: BaseTriggerFilterTypeEnum.Text,
        value: {
          textExpression: BaseTriggerFilterTextValueExpressionEnum.Equals,
        },
      });
    });

    setFieldValue("triggerFilter", newState);
  }, [parentIndex, setFieldValue, values.triggerFilter]);

  const handlChangeCondtion = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        if (draftState?.[parentIndex]) {
          const parentData = draftState[parentIndex];
          if (parentData) {
            if (
              value === BaseTriggerFilterDimensionEnum.DiscountCodes ||
              value === BaseTriggerFilterDimensionEnum.Items
            ) {
              parentData[currentIndex] = {
                ...parenData?.[currentIndex],
                type: BaseTriggerFilterTypeEnum.List,
                dimension: value as BaseTriggerFilterDimensionEnum,
                value: {
                  __typename: "BaseTriggerFilterListValue",
                  listExpression:
                    BaseTriggerFilterListValueExpressionEnum.Contains,
                } as BaseTriggerFilterListValue,
              };
            } else if (
              value === BaseTriggerFilterDimensionEnum.ItemCount ||
              value === BaseTriggerFilterDimensionEnum.ProductId ||
              value === BaseTriggerFilterDimensionEnum.Quantity ||
              value === BaseTriggerFilterDimensionEnum.DollarValue
            ) {
              parentData[currentIndex] = {
                ...parenData?.[currentIndex],
                type: BaseTriggerFilterTypeEnum.Number,
                dimension: value as BaseTriggerFilterDimensionEnum,
                value: {
                  __typename: "BaseTriggerFilterNumberValue",
                  numberExpression:
                    BaseTriggerFilterNumberValueExpressionEnum.Equals,
                } as BaseTriggerFilterNumberValue,
              };
            } else {
              parentData[currentIndex] = {
                ...parenData?.[currentIndex],
                dimension: value as BaseTriggerFilterDimensionEnum,
                type: BaseTriggerFilterTypeEnum.Text,
                value: {
                  __typename: "BaseTriggerFilterTextValue",
                  textExpression:
                    BaseTriggerFilterTextValueExpressionEnum.Equals,
                } as BaseTriggerFilterTextValue,
              };
            }
          }
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parenData, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handleChangType = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        if (draftState?.[parentIndex]) {
          const parentData = draftState[parentIndex];
          if (parentData) {
            parentData[currentIndex] = {
              ...parenData?.[currentIndex],
              type: value as BaseTriggerFilterTypeEnum,
              value:
                value === BaseTriggerFilterTypeEnum.Text
                  ? {
                      __typename: "BaseTriggerFilterTextValue",
                      textExpression:
                        BaseTriggerFilterTextValueExpressionEnum.Equals,
                    }
                  : value === BaseTriggerFilterTypeEnum.Number
                  ? {
                      __typename: "BaseTriggerFilterNumberValue",
                      numberExpression:
                        BaseTriggerFilterNumberValueExpressionEnum.Equals,
                    }
                  : value === BaseTriggerFilterTypeEnum.Date
                  ? {
                      __typename: "BaseTriggerFilterDateValue",
                      dateExpression:
                        BaseTriggerFilterDateValueExpressionEnum.IsInTheLast,
                      dateValue1: 30,
                      dateDelayType: DelayTypeEnum.Days,
                    }
                  : value === BaseTriggerFilterTypeEnum.Boolean
                  ? {
                      __typename: "BaseTriggerFilterBooleanValue",
                      booleanValue: true,
                    }
                  : {
                      __typename: "BaseTriggerFilterListValue",
                      listExpression:
                        BaseTriggerFilterListValueExpressionEnum.Contains,
                    },
            };
          }
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parenData, parentIndex, setFieldValue, values.triggerFilter]
  );

  return (
    <Box marginBottom={3}>
      <Flex gap={{ column: 8, row: 0 }} direction="column">
        <Flex gap={{ column: 2, row: 0 }} direction="column">
          <SelectList
            name="dimension"
            id="dimension"
            placeholder="Select a dimension..."
            onChange={handlChangeCondtion}
            value={dimension ? dimension : undefined}
            size="lg"
            errorMessage={
              (touched.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex] &&
              (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.dimension
                ? ((errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.dimension as string)
                : undefined
            }
          >
            {defaultSelect && defaultSelectOpitons}
            {orderProductSelect && orderedProductSelectOptions}
            {refundeOrderSelect && refundedOrderSelectOptions}
          </SelectList>

          {type === BaseTriggerFilterTypeEnum.Text && (
            <TextType currentIndex={currentIndex} parentIndex={parentIndex} />
          )}
          {type === BaseTriggerFilterTypeEnum.Number && (
            <NumberType currentIndex={currentIndex} parentIndex={parentIndex} />
          )}
          {type === BaseTriggerFilterTypeEnum.Boolean && (
            <BooleanType
              currentIndex={currentIndex}
              parentIndex={parentIndex}
            />
          )}
          {type === BaseTriggerFilterTypeEnum.Date && (
            <DateType currentIndex={currentIndex} parentIndex={parentIndex} />
          )}

          {type === BaseTriggerFilterTypeEnum.List && (
            <ListType currentIndex={currentIndex} parentIndex={parentIndex} />
          )}
        </Flex>
        <Flex justifyContent="end">
          <SelectList
            label="Type"
            name="type"
            id="type"
            onChange={handleChangType}
            value={type ? type : undefined}
            size="lg"
            errorMessage={
              (touched.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex] &&
              (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.type
                ? ((errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.type as string)
                : undefined
            }
          >
            {typeSelectionOptions}
          </SelectList>
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
