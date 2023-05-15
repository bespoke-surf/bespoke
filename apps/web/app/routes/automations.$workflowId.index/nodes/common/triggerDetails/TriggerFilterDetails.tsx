import { Box, Text } from "gestalt";
import { useMemo } from "react";
import type { BaseTriggerFilter } from "../../../../../graphql/__generated__/graphql";
import { BaseTriggerFilterTypeEnum } from "../../../../../graphql/__generated__/graphql";

import {
  triggerFilterBoolenValueExpressionSelectOptions,
  triggerFilterDefaultSelectOpitons,
  triggerFilterListValueSelectOptions,
  triggerFilterNumberValueExpressionSelectOptions,
  triggerFilterOrderedProductSelectOptions,
  triggerFilterTextValueExpressionSelectOption,
} from "../../../triggerFilterTypes";

export const TriggerFilterDetails = ({
  filter,
}: {
  filter: BaseTriggerFilter;
}) => {
  const typeLabel = useMemo(() => {
    let label: string | undefined = "";
    let value: string | number | undefined | null = "";
    if (
      filter.type === BaseTriggerFilterTypeEnum.Text &&
      filter.value?.__typename === "BaseTriggerFilterTextValue"
    ) {
      const expression = filter.value.textExpression;
      label = triggerFilterTextValueExpressionSelectOption.find(
        ({ value }) => value === expression
      )?.label;
      value = filter.value.textValue;
    }
    if (
      filter.type === BaseTriggerFilterTypeEnum.Number &&
      filter.value?.__typename === "BaseTriggerFilterNumberValue"
    ) {
      const expression = filter.value.numberExpression;
      label = triggerFilterNumberValueExpressionSelectOptions.find(
        ({ value }) => value === expression
      )?.label;
      value = filter.value.numberValue;
    }
    if (
      filter.type === BaseTriggerFilterTypeEnum.List &&
      filter.value?.__typename === "BaseTriggerFilterListValue"
    ) {
      const expression = filter.value.listExpression;
      label = triggerFilterListValueSelectOptions.find(
        ({ value }) => value === expression
      )?.label;
      value = filter.value.listValue;
    }
    if (
      filter.type === BaseTriggerFilterTypeEnum.Boolean &&
      filter.value?.__typename === "BaseTriggerFilterBooleanValue"
    ) {
      const expression = filter.value.booleanValue ? "true" : "false";
      label = triggerFilterBoolenValueExpressionSelectOptions.find(
        ({ value }) => value === expression
      )?.label;
      value = filter.value.booleanValue ? "is true" : "is false";
    }

    return [label, value];
  }, [filter.type, filter.value]);

  const dimensionLabel = useMemo(() => {
    if (
      triggerFilterDefaultSelectOpitons.some(
        ({ value }) => value === filter.dimension
      )
    ) {
      return triggerFilterDefaultSelectOpitons.find(
        ({ value }) => value === filter.dimension
      )?.label;
    } else if (
      triggerFilterOrderedProductSelectOptions.some(
        ({ value }) => value === filter.dimension
      )
    ) {
      return triggerFilterOrderedProductSelectOptions.find(
        ({ value }) => value === filter.dimension
      )?.label;
    }
    return filter.dimension;
  }, [filter.dimension]);

  return (
    <Box>
      <Text weight="bold" size="300" inline>
        {dimensionLabel}{" "}
      </Text>

      <Text size="300" inline>
        {typeLabel[0]}{" "}
      </Text>

      <Text weight="bold" size="300" inline>
        {typeLabel[1]}
      </Text>
    </Box>
  );
};
