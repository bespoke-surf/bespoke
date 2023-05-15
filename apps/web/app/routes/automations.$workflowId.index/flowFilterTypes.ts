import type { ComboBoxItemType } from "gestalt";
import * as yup from "yup";
import {
  BaseConditionalFilterConditionEnum,
  BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum,
  BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum,
  BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
  BaseTriggerFilterDateValueExpressionEnum,
  DelayTypeEnum,
} from "../../graphql/__generated__/graphql";

const inequalityShape = yup.object().shape({
  expression: yup
    .mixed<BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum>()
    .oneOf(
      Object.values(
        BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum
      ),
      "select an expression"
    )
    .required("select an expression"),
  value: yup.number().when("expression", {
    is: (
      value: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum
    ) => {
      if (
        value ===
          BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce ||
        value ===
          BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.ZeroTimes
      ) {
        return false;
      }
      return true;
    },
    then: (schema) => schema.required("enter a value"),
    otherwise: (schema) => schema.nullable(true),
  }),
});

const value1Shape = yup.number().when("expression", {
  is: (
    value:
      | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      | BaseTriggerFilterDateValueExpressionEnum
  ) => {
    if (
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast ||
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsInTheLast ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsBetween ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsInTheNext ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsAtLeast
    ) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("enter a value"),
  otherwise: (schema) => schema.nullable(true),
});

const value2Shape = yup.number().when("expression", {
  is: (
    value:
      | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      | BaseTriggerFilterDateValueExpressionEnum
  ) => {
    if (
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsBetween
    ) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("enter a value"),
  otherwise: (schema) => schema.nullable(true),
});
const date1Shape = yup.string().when("expression", {
  is: (
    value:
      | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      | BaseTriggerFilterDateValueExpressionEnum
  ) => {
    if (
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Before ||
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.After ||
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsBefore ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsAfter ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates
    ) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("select a date"),
  otherwise: (schema) => schema.nullable(true),
});

const date2Shape = yup.string().when("expression", {
  is: (
    value:
      | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      | BaseTriggerFilterDateValueExpressionEnum
  ) => {
    if (
      value ===
        BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates ||
      value === BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates
    ) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("select a date"),
  otherwise: (schema) => schema.nullable(true),
});

const timeShape = (expressionShcema: yup.AnySchema) =>
  yup.object().shape({
    expression: expressionShcema,
    value1: value1Shape,
    value2: value2Shape,
    date1: date1Shape,
    date2: date2Shape,
    delayType: yup.mixed<DelayTypeEnum>().when("expression", {
      is: (
        value:
          | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
          | BaseTriggerFilterDateValueExpressionEnum
      ) => {
        if (
          value ===
            BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast ||
          value ===
            BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between ||
          value === BaseTriggerFilterDateValueExpressionEnum.IsInTheLast ||
          value === BaseTriggerFilterDateValueExpressionEnum.IsBetween ||
          value === BaseTriggerFilterDateValueExpressionEnum.IsInTheNext ||
          value === BaseTriggerFilterDateValueExpressionEnum.IsAtLeast
        ) {
          return true;
        }
        return false;
      },
      then: (schema) =>
        schema.oneOf(Object.values(DelayTypeEnum)).required("select a dd"),
      otherwise: (schema) => schema.nullable(true),
    }),
  });
const valueOfConditon = yup.object().shape({
  trigger: yup
    .mixed<BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum>()
    .oneOf(
      Object.values(BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum),
      "select a metric"
    )
    .required("select a metric"),
  inequality: inequalityShape.required(),
  time: timeShape(
    yup
      .mixed<BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum>()
      .oneOf(
        Object.values(
          BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
        ),
        "please select one"
      )
      .required("please select one")
  ).required(),
});

export const FlowFilterShcema = yup.object().shape({
  flowFilter: yup
    .array()
    .of(
      yup.array().of(
        yup.object().shape({
          condition: yup
            .mixed<BaseConditionalFilterConditionEnum>()
            .oneOf(
              Object.values(BaseConditionalFilterConditionEnum),
              "select a condition"
            )
            .required("select a condition"),
          value: valueOfConditon.required(),
        })
      )
    )
    .nullable(true),
});

export const inequlitieOptions = [
  {
    label: "at least once",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AtLeastOnce,
  },
  {
    label: "zero times",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.ZeroTimes,
  },

  {
    label: "equals",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.Equals,
  },

  {
    label: "doesn't equal",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.DoesntEqual,
  },

  {
    label: "is at least",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IsAtLeast,
  },

  {
    label: "is greater than",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IsGreaterThan,
  },

  {
    label: "is less than",
    value:
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IsLessThan,
  },
];

export const timeExpressionOptions = [
  {
    label: "over all time",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.OverAllTime,
  },
  {
    label: "in the last",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.InTheLast,
  },

  {
    label: "between",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Between,
  },

  {
    label: "before",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.Before,
  },

  {
    label: "after",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.After,
  },

  {
    label: "between dates",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BetweenDates,
  },

  {
    label: "since starting this flow",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.SinceStartingThisFlow,
  },
];

export const defaultFilterOptions: ComboBoxItemType[] = [
  {
    label: "Bounced Email",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailBounced,
  },
  {
    label: "Email Clicked",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailLinkClicked,
  },
  {
    label: "Dropped Email",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailDropped,
  },
  {
    label: "Email Sent",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailSent,
  },
  {
    label: "Email Marked As Spam",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailMarkedAsSpam,
  },
  {
    label: "Email Opened",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailOpened,
  },
  {
    label: "Email Received",
    value: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailReceived,
  },
  {
    label: "Email Unsubscribed",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EmailUnsubscribed,
  },
];

export const filtershopifyOptions: ComboBoxItemType[] = [
  {
    label: "Placed Order",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.ShopifyPlacedOrder,
    subtext: "Shopify",
  },
  {
    label: "Checkout Started",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.ShopifyCheckoutStarted,
    subtext: "Shopify",
  },
  {
    label: "Fulfilled Order",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.ShopifyFulfilledOrder,
    subtext: "Shopify",
  },
  {
    label: "Cancelled Order",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.ShopifyCancelledOrder,
    subtext: "Shopify",
  },
  {
    label: "Refunded Order",
    value:
      BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.ShopifyRefundedOrder,
    subtext: "Shopify",
  },
];
