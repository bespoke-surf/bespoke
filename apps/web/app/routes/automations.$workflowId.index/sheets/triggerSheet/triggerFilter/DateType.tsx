import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useFormikContext } from "formik";
import { Flex, NumberField, SelectList, Text } from "gestalt";
import { DatePicker } from "gestalt-datepicker";
import produce from "immer";
import { useCallback, useRef, useState } from "react";
import type {
  BaseTriggerFilter,
  BaseTriggerFilterDateValue,
} from "../../../../../graphql/__generated__/graphql";
import {
  BaseTriggerFilterDateValueExpressionEnum,
  DelayTypeEnum,
} from "../../../../../graphql/__generated__/graphql";
import type { TriggerFilterFormikFormValues } from "../../../types";

dayjs.extend(utc);

export default function DateType({
  currentIndex,
  parentIndex,
}: {
  currentIndex: number;
  parentIndex: number;
}) {
  const { setFieldValue, values, touched, errors } =
    useFormikContext<TriggerFilterFormikFormValues>();

  const mainValue = values.triggerFilter?.[parentIndex]?.[currentIndex]?.value;
  const expression =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateExpression
      : undefined;

  const value1 =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateValue1
      : undefined;
  const value2 =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateValue2
      : undefined;
  const date1 =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateDate1
      : undefined;
  const date2 =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateDate2
      : undefined;

  const delayType =
    mainValue?.__typename === "BaseTriggerFilterDateValue"
      ? mainValue.dateDelayType
      : undefined;

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

  const daysSepecific =
    expression === BaseTriggerFilterDateValueExpressionEnum.IsInTheLast ||
    expression === BaseTriggerFilterDateValueExpressionEnum.IsAtLeast ||
    expression === BaseTriggerFilterDateValueExpressionEnum.IsInTheNext ||
    expression === BaseTriggerFilterDateValueExpressionEnum.IsBetween;

  const dateSpecific =
    expression === BaseTriggerFilterDateValueExpressionEnum.IsBefore ||
    expression === BaseTriggerFilterDateValueExpressionEnum.IsAfter ||
    expression === BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates;

  const handlChangeExpression = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          if (value === BaseTriggerFilterDateValueExpressionEnum.IsBetween) {
            draftCurrentData.value = {
              ...draftCurrentData.value,
              dateValue1: 0,
              dateValue2: 30,
              dateExpression: value as BaseTriggerFilterDateValueExpressionEnum,
            } as BaseTriggerFilterDateValue;
          } else {
            draftCurrentData.value = {
              ...draftCurrentData.value,
              dateExpression: value as BaseTriggerFilterDateValueExpressionEnum,
            } as BaseTriggerFilterDateValue;
          }
        }
      });

      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handlChangeDelayType = useCallback(
    ({ value }: { value: string }) => {
      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            dateDelayType: value as DelayTypeEnum,
          } as BaseTriggerFilterDateValue;
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );
  const handleDateChange = useCallback(
    ({ date, value }: { date: Date; value: "date1" | "date2" }) => {
      if (!(date instanceof Date)) return;

      let dateValue: { dateDate1?: string; dateDate2?: string } = {};

      if (value === "date1") {
        dateValue["dateDate1"] = dayjs(date)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.sssZ");
        // 2022-11-25T16:03:06.230Z
      } else {
        dateValue["dateDate2"] = dayjs(date)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.sssZ");
      }

      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            ...dateValue,
          } as BaseTriggerFilterDateValue;
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );

  const handleValueChange = useCallback(
    ({ value, name }: { value: number; name: "value1" | "value2" }) => {
      let dataValue: { dateValue1?: number; dateValue2?: number } = {};

      if (name === "value1") {
        dataValue["dateValue1"] = value;
      } else {
        dataValue["dateValue2"] = value;
      }

      const newState = produce(values.triggerFilter, (draftState) => {
        const parentData = draftState?.[parentIndex];
        const draftCurrentData = parentData?.[currentIndex];
        if (draftCurrentData) {
          draftCurrentData.value = {
            ...draftCurrentData.value,
            ...dataValue,
          } as BaseTriggerFilterDateValue;
        }
      });
      setFieldValue("triggerFilter", newState);
    },
    [currentIndex, parentIndex, setFieldValue, values.triggerFilter]
  );
  return (
    <Flex direction="column" gap={{ row: 0, column: 2 }}>
      <Flex direction="row" gap={{ column: 2, row: 1 }} wrap>
        <Flex.Item flex="grow">
          <SelectList
            name="expression"
            id="expression"
            onChange={handlChangeExpression}
            value={expression ? expression : undefined}
            size="lg"
            errorMessage={
              (touched.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                parentIndex
              ]?.[currentIndex]?.value &&
              (
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterDateValue
              )?.dateExpression
                ? ((
                    (
                      errors.triggerFilter as unknown as BaseTriggerFilter[][]
                    )?.[parentIndex]?.[currentIndex]
                      ?.value as BaseTriggerFilterDateValue
                  )?.dateExpression as unknown as string)
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
                if (value) {
                  setStartDate(value);
                  handleDateChange({ date: value, value: "date1" });
                }
              }}
              rangeSelector="start"
              value={startDate}
              ref={startDateInput}
              errorMessage={
                (
                  (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                    parentIndex
                  ]?.[currentIndex]?.value as BaseTriggerFilterDateValue
                )?.dateDate1
                  ? "select a date"
                  : undefined
              }
            />

            {expression ===
              BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates && (
              <Flex gap={{ row: 1, column: 0 }} alignItems="center">
                <Text>and </Text>
                <DatePicker
                  id="date2"
                  name="date2"
                  rangeStartDate={startDate}
                  rangeEndDate={endDate}
                  nextRef={startDateInput}
                  onChange={({ value }) => {
                    if (value) {
                      setEndDate(value);
                      handleDateChange({ date: value, value: "date2" });
                    }
                  }}
                  rangeSelector="end"
                  value={endDate}
                  ref={endDateInput}
                  errorMessage={
                    (
                      (
                        errors.triggerFilter as unknown as BaseTriggerFilter[][]
                      )?.[parentIndex]?.[currentIndex]
                        ?.value as BaseTriggerFilterDateValue
                    )?.dateDate2
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
                  value={value1 || value1 === 0 ? value1 : undefined}
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
                      (
                        errors.triggerFilter as unknown as BaseTriggerFilter[][]
                      )?.[parentIndex]?.[currentIndex]
                        ?.value as BaseTriggerFilterDateValue
                    )?.dateValue1
                      ? "enter a value"
                      : undefined
                  }
                />
              </Flex.Item>
              {expression ===
              BaseTriggerFilterDateValueExpressionEnum.IsBetween ? (
                <Text>and</Text>
              ) : null}
              {expression ===
              BaseTriggerFilterDateValueExpressionEnum.IsBetween ? (
                <NumberField
                  size="lg"
                  value={value2 ? value2 : undefined}
                  id="value2"
                  name="value2"
                  onChange={({ value }) => {
                    if (value !== undefined) {
                      handleValueChange({ name: "value2", value });
                    }
                  }}
                  errorMessage={
                    (
                      (
                        errors.triggerFilter as unknown as BaseTriggerFilter[][]
                      )?.[parentIndex]?.[currentIndex]
                        ?.value as BaseTriggerFilterDateValue
                    )?.dateValue2
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
            size="lg"
            placeholder="select a delay"
            errorMessage={
              (
                (errors.triggerFilter as unknown as BaseTriggerFilter[][])?.[
                  parentIndex
                ]?.[currentIndex]?.value as BaseTriggerFilterDateValue
              )?.dateDelayType
                ? "select a delay"
                : undefined
            }
          >
            {delayOptions}
          </SelectList>
          {expression === BaseTriggerFilterDateValueExpressionEnum.IsBetween ||
          expression === BaseTriggerFilterDateValueExpressionEnum.IsAtLeast ? (
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

const timeOptions = [
  {
    label: "is in the last",
    value: BaseTriggerFilterDateValueExpressionEnum.IsInTheLast,
  },
  {
    label: "is atleast",
    value: BaseTriggerFilterDateValueExpressionEnum.IsAtLeast,
  },
  {
    label: "is between",
    value: BaseTriggerFilterDateValueExpressionEnum.IsBetween,
  },
  {
    label: "is in the next",
    value: BaseTriggerFilterDateValueExpressionEnum.IsInTheNext,
  },
  {
    label: "is before",
    value: BaseTriggerFilterDateValueExpressionEnum.IsBefore,
  },
  {
    label: "is after",
    value: BaseTriggerFilterDateValueExpressionEnum.IsAfter,
  },
  {
    label: "is between dates",
    value: BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates,
  },
].map(({ label, value }) => (
  <SelectList.Option key={label} label={label} value={value} />
));
