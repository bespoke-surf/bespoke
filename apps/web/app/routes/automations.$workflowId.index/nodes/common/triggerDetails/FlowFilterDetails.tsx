import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Box, Text } from "gestalt";
import { useMemo } from "react";
import type { BaseConditionalFilter } from "../../../../../graphql/__generated__/graphql";
import {
  BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
  BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
} from "../../../../../graphql/__generated__/graphql";

import {
  defaultFilterOptions,
  filtershopifyOptions,
  inequlitieOptions,
  timeExpressionOptions,
} from "../../../flowFilterTypes";
dayjs.extend(LocalizedFormat);

export const FlowFilterDetails = ({
  filter,
}: {
  filter: BaseConditionalFilter;
}) => {
  const inequalityLabe = useMemo(
    () =>
      inequlitieOptions.find(
        ({ value }) => value === filter.value?.inequality?.expression
      )?.label,
    [filter.value?.inequality?.expression]
  );

  const timeLabe = useMemo(
    () =>
      timeExpressionOptions.find(
        ({ value }) => value === filter.value?.time?.expression
      )?.label,
    [filter.value?.time?.expression]
  );

  const triggerLabel = useMemo(() => {
    if (
      defaultFilterOptions.some(({ value }) => value === filter.value?.trigger)
    ) {
      return defaultFilterOptions.find(
        ({ value }) => value === filter.value?.trigger
      )?.label;
    } else if (
      filtershopifyOptions.some(({ value }) => value === filter.value?.trigger)
    ) {
      return filtershopifyOptions.find(
        ({ value }) => value === filter.value?.trigger
      )?.label;
    }
    return filter.value?.trigger;
  }, [filter.value?.trigger]);

  return (
    <Box>
      <Text weight="bold" size="300" inline>
        {triggerLabel}{" "}
      </Text>
      <Text size="300" inline>
        {inequalityLabe}
      </Text>
      {filter.value?.inequality?.value !== undefined &&
      filter.value?.inequality.expression !==
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.ZeroTimes &&
      filter.value?.inequality.expression !==
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce ? (
        <Text weight="bold" size="300" inline>
          {" "}
          {filter.value?.inequality?.value}
        </Text>
      ) : null}
      <Text size="300" inline>
        {" "}
        {timeLabe}
      </Text>
      {filter.value?.time?.value1 !== undefined &&
      (filter.value.time.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast ||
        filter.value.time.expression ===
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between) ? (
        <Text size="300" inline weight="bold">
          {" "}
          {filter.value?.time?.value1}
        </Text>
      ) : null}
      {filter.value?.time?.value2 !== undefined &&
      filter.value.time.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ? (
        <>
          <Text size="300" inline>
            {" "}
            and{" "}
          </Text>

          <Text size="300" inline weight="bold">
            {filter.value?.time?.value2}
          </Text>
        </>
      ) : null}
      {filter.value?.time?.delayType &&
      (filter.value.time.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast ||
        filter.value.time.expression ===
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between) ? (
        <Text size="300" inline weight="bold">
          {" "}
          {filter.value?.time?.delayType.toLocaleLowerCase()}
        </Text>
      ) : null}
      {filter.value?.time?.delayType &&
      filter.value.time.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ? (
        <Text size="300" inline>
          {" "}
          ago
        </Text>
      ) : null}
      {filter.value?.time?.date1 &&
      (filter?.value?.time?.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Before ||
        filter.value?.time?.expression ===
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.After ||
        filter.value?.time?.expression ===
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates) ? (
        <Text size="300" inline weight="bold">
          {" "}
          {dayjs(filter.value.time.date1).local().format("L")}
        </Text>
      ) : null}
      {filter.value?.time?.date2 &&
      filter.value?.time?.expression ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates ? (
        <>
          <Text size="300" inline>
            {" "}
            and{" "}
          </Text>
          <Text size="300" inline weight="bold">
            {dayjs(filter.value.time.date2).local().format("L")}
          </Text>
        </>
      ) : null}
    </Box>
  );
};
