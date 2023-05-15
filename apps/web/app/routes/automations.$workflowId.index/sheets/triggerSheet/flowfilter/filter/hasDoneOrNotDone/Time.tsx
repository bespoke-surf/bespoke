import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useFormikContext } from "formik";
import { Flex, NumberField, SelectList, Text } from "gestalt";
import { DatePicker } from "gestalt-datepicker";
import produce from "immer";
import { useCallback, useRef, useState } from "react";
import type { BaseConditionalFilter } from "../../../../../../../graphql/__generated__/graphql";
import {
  BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
  DelayTypeEnum,
} from "../../../../../../../graphql/__generated__/graphql";
import { timeExpressionOptions } from "../../../../../flowFilterTypes";
import type { FlowFilterFormikFormValues } from "../../../../../types";
dayjs.extend(utc);

export default function Time({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, touched, errors } =
    useFormikContext<FlowFilterFormikFormValues>();

  const expressionValue = values?.flowFilter?.[parentIndex];

  const expression = expressionValue?.[currentIndex]?.value?.time?.expression;
  const value1 = expressionValue?.[currentIndex]?.value?.time?.value1;
  const value2 = expressionValue?.[currentIndex]?.value?.time?.value2;
  const date1 = expressionValue?.[currentIndex]?.value?.time?.date1;
  const date2 = expressionValue?.[currentIndex]?.value?.time?.date2;

  const delayType = expressionValue?.[currentIndex]?.value?.time?.delayType;

  const [startDate, setStartDate] = useState<Date | undefined>(
    date1
      ? new Date(
          dayjs(date1).utc().local().format("YYYY-MM-DDTHH:mm:ss.sss[Z]")
        )
      : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    date2
      ? new Date(
          dayjs(date2).utc().local().format("YYYY-MM-DDTHH:mm:ss.sss[Z]")
        )
      : undefined
  );
  const endDateInput = useRef(null);
  const startDateInput = useRef(null);

  const [selectExpression, setSelectExpression] =
    useState<BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum>(
      expression ??
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.OverAllTime
    );

  const daysSepecific =
    selectExpression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast ||
    selectExpression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between;

  const dateSpecific =
    selectExpression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Before ||
    selectExpression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.After ||
    selectExpression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates;

  const handlChangeExpression = useCallback(
    ({ value }: { value: string }) => {
      setSelectExpression(
        value as BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      );
      const newState = produce(values.flowFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          if (
            value ===
            BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast
          ) {
            draftCurrentData.value = {
              ...draftCurrentData.value,
              time: {
                ...draftCurrentData.value!.time,
                value1: 30,
                delayType: DelayTypeEnum.Days,
                expression:
                  value as BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
              },
            };
          } else if (
            value ===
            BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between
          ) {
            draftCurrentData.value = {
              ...draftCurrentData.value,
              time: {
                ...draftCurrentData.value!.time,
                value1: 0,
                value2: 30,
                delayType: DelayTypeEnum.Days,
                expression:
                  value as BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
              },
            };
          } else {
            draftCurrentData.value = {
              ...draftCurrentData.value,
              time: {
                ...draftCurrentData.value!.time,
                expression:
                  value as BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
              },
            };
          }
        }
      });

      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  const handlChangeDelayType = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.flowFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            time: {
              ...draftCurrentData.value?.time,
              delayType: value as DelayTypeEnum,
            },
          };
        }
      });
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );
  const handleDateChange = useCallback(
    ({ date, value }: { date: Date; value: "date1" | "date2" }) => {
      if (!(date instanceof Date)) return;

      let dateValue: { date1?: string; date2?: string } = {};

      if (value === "date1") {
        dateValue["date1"] = dayjs(date)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.sssZ");
        // 2022-11-25T16:03:06.230Z
      } else {
        dateValue["date2"] = dayjs(date)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.sssZ");
      }

      const newState = produce(values.flowFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            time: {
              ...draftCurrentData.value?.time,
              ...dateValue,
            },
          };
        }
      });
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );

  const handleValueChange = useCallback(
    ({ value, name }: { value: number; name: "value1" | "value2" }) => {
      let dataValue: { value1?: number; value2?: number } = {};

      if (name === "value1") {
        dataValue["value1"] = value;
      } else {
        dataValue["value2"] = value;
      }

      const newState = produce(values.flowFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            time: {
              ...draftCurrentData.value?.time,
              ...dataValue,
            },
          };
        }
      });
      setFieldValue("flowFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.flowFilter]
  );
  return (
    <Flex direction="column" gap={{ row: 0, column: 2 }}>
      <Flex direction="row" gap={{ column: 2, row: 1 }} wrap>
        <Flex.Item flex="grow">
          <SelectList
            name="expression"
            id="expression"
            onChange={handlChangeExpression}
            value={selectExpression}
            size="lg"
            errorMessage={
              (touched.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value &&
              (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value?.time?.expression
                ? ((
                    errors.flowFilter as unknown as BaseConditionalFilter[][]
                  )?.[parentIndex]?.[currentIndex]?.value?.time
                    ?.expression as unknown as string)
                : undefined
            }
          >
            {timeOptions}
          </SelectList>
        </Flex.Item>
        {dateSpecific ? (
          <Flex gap={{ row: 1, column: 0 }} alignItems="center">
            <DatePicker
              id="date1"
              name="date1"
              rangeStartDate={startDate}
              rangeEndDate={endDate}
              nextRef={endDateInput}
              onChange={({ value }) => {
                setStartDate(value);
                handleDateChange({ date: value, value: "date1" });
              }}
              rangeSelector="start"
              value={startDate}
              ref={startDateInput}
              errorMessage={
                (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value?.time?.date1
                  ? "select a date"
                  : undefined
              }
            />

            {selectExpression ===
              BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates && (
              <Flex gap={{ row: 1, column: 0 }} alignItems="center">
                <Text>and </Text>
                <DatePicker
                  id="date2"
                  name="date2"
                  rangeStartDate={startDate}
                  rangeEndDate={endDate}
                  nextRef={startDateInput}
                  onChange={({ value }) => {
                    setEndDate(value);
                    handleDateChange({ date: value, value: "date2" });
                  }}
                  rangeSelector="end"
                  value={endDate}
                  ref={endDateInput}
                  errorMessage={
                    (
                      errors.flowFilter as unknown as BaseConditionalFilter[][]
                    )?.[parentIndex]?.[currentIndex]?.value?.time?.date2
                      ? "select a date"
                      : undefined
                  }
                />
              </Flex>
            )}
          </Flex>
        ) : null}
      </Flex>

      {daysSepecific ? (
        <Flex direction="row" gap={{ column: 0, row: 1 }} alignItems="center">
          <Flex.Item flex="grow">
            <Flex gap={{ column: 0, row: 1 }} alignItems="center">
              <Flex.Item flex="grow">
                <NumberField
                  value={value1 ?? undefined}
                  size="lg"
                  id="value1"
                  name="value1"
                  onChange={({ value }) => {
                    if (value !== undefined) {
                      handleValueChange({ name: "value1", value });
                    }
                  }}
                  errorMessage={
                    (
                      errors.flowFilter as unknown as BaseConditionalFilter[][]
                    )?.[parentIndex]?.[currentIndex]?.value?.time?.value1
                      ? "enter a value"
                      : undefined
                  }
                />
              </Flex.Item>
              {selectExpression ===
              BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ? (
                <Text>and</Text>
              ) : null}
              {selectExpression ===
              BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ? (
                <NumberField
                  size="lg"
                  value={value2 ?? undefined}
                  id="value2"
                  name="value2"
                  onChange={({ value }) => {
                    if (value !== undefined) {
                      handleValueChange({ name: "value2", value });
                    }
                  }}
                  errorMessage={
                    (
                      errors.flowFilter as unknown as BaseConditionalFilter[][]
                    )?.[parentIndex]?.[currentIndex]?.value?.time?.value2
                      ? "enter a value"
                      : undefined
                  }
                />
              ) : null}
            </Flex>
          </Flex.Item>
          <SelectList
            name="delayType"
            id="delayType"
            onChange={handlChangeDelayType}
            value={delayType ? delayType : undefined}
            placeholder="select a delay"
            size="lg"
            errorMessage={
              (errors.flowFilter as unknown as BaseConditionalFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value?.time?.delayType
                ? "select a delay"
                : undefined
            }
          >
            {delayOptions}
          </SelectList>
          {selectExpression ===
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ? (
            <Text>ago</Text>
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
}

const delayOptions = [
  {
    label: "days",
    value: DelayTypeEnum.Days,
  },
  {
    label: "hours",
    value: DelayTypeEnum.Hours,
  },

  {
    label: "weeks",
    value: DelayTypeEnum.Weeks,
  },
].map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));

const timeOptions = timeExpressionOptions.map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));
