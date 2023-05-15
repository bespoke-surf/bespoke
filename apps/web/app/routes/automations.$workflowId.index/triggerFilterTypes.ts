import type { ComboBoxProps } from "gestalt";
import * as yup from "yup";
import type { BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum } from "../../graphql/__generated__/graphql";
import {
  BaseTriggerFilterDateValueExpressionEnum,
  BaseTriggerFilterDimensionEnum,
  BaseTriggerFilterListValueExpressionEnum,
  BaseTriggerFilterNumberValueExpressionEnum,
  BaseTriggerFilterTextValueExpressionEnum,
  BaseTriggerFilterTypeEnum,
  DelayTypeEnum,
} from "../../graphql/__generated__/graphql";

const value1Shape = yup.number().when("dateExpression", {
  is: (value: BaseTriggerFilterDateValueExpressionEnum) => {
    if (
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

const value2Shape = yup.number().when("dateExpression", {
  is: (value: BaseTriggerFilterDateValueExpressionEnum) => {
    if (value === BaseTriggerFilterDateValueExpressionEnum.IsBetween) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("enter a value"),
  otherwise: (schema) => schema.nullable(true),
});
const date1Shape = yup.string().when("dateExpression", {
  is: (value: BaseTriggerFilterDateValueExpressionEnum) => {
    if (
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

const date2Shape = yup.string().when("dateExpression", {
  is: (
    value:
      | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
      | BaseTriggerFilterDateValueExpressionEnum
  ) => {
    if (value === BaseTriggerFilterDateValueExpressionEnum.IsBetweenDates) {
      return true;
    }
    return false;
  },
  then: (schema) => schema.required("select a date"),
  otherwise: (schema) => schema.nullable(true),
});

export const TriggerFilterSchema = yup.object().shape({
  triggerFilter: yup
    .array()
    .of(
      yup.array().of(
        yup.object().shape({
          dimension: yup
            .mixed<BaseTriggerFilterDimensionEnum>()
            .oneOf(
              Object.values(BaseTriggerFilterDimensionEnum),
              "select a dimension"
            )
            .required("select a dimension"),
          type: yup
            .mixed<BaseTriggerFilterTypeEnum>()
            .oneOf(Object.values(BaseTriggerFilterTypeEnum), "select a type")
            .required("select a type"),
          value: yup
            .object()
            .when("type", {
              is: (value: BaseTriggerFilterTypeEnum) =>
                value === BaseTriggerFilterTypeEnum.Text,
              then: (shema) =>
                shema.shape({
                  textExpression: yup
                    .mixed<BaseTriggerFilterTextValueExpressionEnum>()
                    .oneOf(
                      Object.values(BaseTriggerFilterTextValueExpressionEnum),
                      "select an expression"
                    )
                    .required("select an expression"),
                  textValue: yup.string().required("enter dimension value"),
                }),
              otherwise: (schema) => schema.nullable(true),
            })
            .when("type", {
              is: (value: BaseTriggerFilterTypeEnum) =>
                value === BaseTriggerFilterTypeEnum.Number,
              then: (shema) =>
                shema.shape({
                  numberExpression: yup
                    .mixed<BaseTriggerFilterNumberValueExpressionEnum>()
                    .oneOf(
                      Object.values(BaseTriggerFilterNumberValueExpressionEnum),
                      "select an expression"
                    )
                    .required("select an expression"),
                  numberValue: yup.number().required("enter value"),
                }),
              otherwise: (schema) => schema.nullable(true),
            })
            .when("type", {
              is: (value: BaseTriggerFilterTypeEnum) =>
                value === BaseTriggerFilterTypeEnum.Boolean,
              then: (shema) =>
                shema.shape({
                  booleanValue: yup.boolean().required("select boolean"),
                }),
              otherwise: (schema) => schema.nullable(true),
            })
            .when("type", {
              is: (value: BaseTriggerFilterTypeEnum) =>
                value === BaseTriggerFilterTypeEnum.List,
              then: (shema) =>
                shema.shape({
                  listExpression: yup
                    .mixed<BaseTriggerFilterListValueExpressionEnum>()
                    .oneOf(
                      Object.values(BaseTriggerFilterListValueExpressionEnum),
                      "select an expression"
                    )
                    .required("select an expression"),
                  listValue: yup.string().when("expression", {
                    is: (value: BaseTriggerFilterListValueExpressionEnum) =>
                      value ===
                        BaseTriggerFilterListValueExpressionEnum.IsEmpty ||
                      value ===
                        BaseTriggerFilterListValueExpressionEnum.HasAtleastOneItem,
                    then: (schema) => schema.nullable(true),
                    otherwise: (schema) =>
                      schema.required("enter dimension value"),
                  }),
                }),
              otherwise: (schema) => schema.nullable(true),
            })
            .when("type", {
              is: (value: BaseTriggerFilterTypeEnum) =>
                value === BaseTriggerFilterTypeEnum.Date,
              then: () =>
                yup
                  .object()
                  .shape({
                    dateExpression: yup
                      .mixed<BaseTriggerFilterDateValueExpressionEnum>()
                      .oneOf(
                        Object.values(BaseTriggerFilterDateValueExpressionEnum),
                        "please select one"
                      )
                      .required("please select one"),
                    dateValue1: value1Shape,
                    dateValue2: value2Shape,
                    dateDate1: date1Shape,
                    dateDate2: date2Shape,
                    dateDelayType: yup
                      .mixed<DelayTypeEnum>()
                      .when("dateExpression", {
                        is: (
                          value:
                            | BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum
                            | BaseTriggerFilterDateValueExpressionEnum
                        ) => {
                          if (
                            BaseTriggerFilterDateValueExpressionEnum.IsInTheLast ||
                            value ===
                              BaseTriggerFilterDateValueExpressionEnum.IsBetween ||
                            value ===
                              BaseTriggerFilterDateValueExpressionEnum.IsInTheNext ||
                            value ===
                              BaseTriggerFilterDateValueExpressionEnum.IsAtLeast
                          ) {
                            return true;
                          }
                          return false;
                        },
                        then: (schema) =>
                          schema
                            .oneOf(Object.values(DelayTypeEnum))
                            .required("select a delay"),
                        otherwise: (schema) => schema.nullable(true),
                      }),
                  })
                  .required(),
              otherwise: (schema) => schema.nullable(true),
            }),
        })
      )
    )
    .nullable(true),
});

export const triggerFilterRefundedOrderSelectOptions: ComboBoxProps["options"] =
  [
    {
      label: "Item Count",
      value: BaseTriggerFilterDimensionEnum.ItemCount,
    },

    {
      label: "Items",
      value: BaseTriggerFilterDimensionEnum.Items,
    },
    {
      label: "Total Discounts",
      value: BaseTriggerFilterDimensionEnum.TotalDiscounts,
    },

    {
      label: "$value",
      value: BaseTriggerFilterDimensionEnum.DollarValue,
    },
  ];

export const triggerFilterDefaultSelectOpitons: ComboBoxProps["options"] = [
  {
    label: "Discount Codes",
    value: BaseTriggerFilterDimensionEnum.DiscountCodes,
  },

  {
    label: "Item Count",
    value: BaseTriggerFilterDimensionEnum.ItemCount,
  },

  {
    label: "Items",
    value: BaseTriggerFilterDimensionEnum.Items,
  },
  {
    label: "Shipping Rate",
    value: BaseTriggerFilterDimensionEnum.ShippingRate,
  },
  {
    label: "Source Name",
    value: BaseTriggerFilterDimensionEnum.SourceName,
  },

  {
    label: "Total Discounts",
    value: BaseTriggerFilterDimensionEnum.TotalDiscounts,
  },

  {
    label: "$value",
    value: BaseTriggerFilterDimensionEnum.DollarValue,
  },
];

export const triggerFilterOrderedProductSelectOptions: ComboBoxProps["options"] =
  [
    {
      label: "Name",
      value: BaseTriggerFilterDimensionEnum.Name,
    },

    {
      label: "ProductID",
      value: BaseTriggerFilterDimensionEnum.ProductId,
    },

    {
      label: "Quantity",
      value: BaseTriggerFilterDimensionEnum.Quantity,
    },
    {
      label: "SKU",
      value: BaseTriggerFilterDimensionEnum.Sku,
    },
    {
      label: "Variant Name",
      value: BaseTriggerFilterDimensionEnum.VariantName,
    },

    {
      label: "Vendor",
      value: BaseTriggerFilterDimensionEnum.Vendor,
    },

    {
      label: "$value",
      value: BaseTriggerFilterDimensionEnum.DollarValue,
    },
  ];

export const filterTypeSelectOptions: ComboBoxProps["options"] = [
  {
    label: "Text",
    value: BaseTriggerFilterTypeEnum.Text,
  },
  {
    label: "Number",
    value: BaseTriggerFilterTypeEnum.Number,
  },
  {
    label: "Boolean",
    value: BaseTriggerFilterTypeEnum.Boolean,
  },
  {
    label: "List",
    value: BaseTriggerFilterTypeEnum.List,
  },
];

export const triggerFilterTextValueExpressionSelectOption: ComboBoxProps["options"] =
  [
    {
      label: "equals",
      value: BaseTriggerFilterTextValueExpressionEnum.Equals,
    },
    {
      label: "doesn't equals",
      value: BaseTriggerFilterTextValueExpressionEnum.DosentEqual,
    },
    {
      label: "contains",
      value: BaseTriggerFilterTextValueExpressionEnum.Contains,
    },
    {
      label: "doesn't contain",
      value: BaseTriggerFilterTextValueExpressionEnum.DosentContain,
    },
    {
      label: "is in",
      value: BaseTriggerFilterTextValueExpressionEnum.IsIn,
    },
    {
      label: "is not in",
      value: BaseTriggerFilterTextValueExpressionEnum.IsNotIn,
    },
    {
      label: "starts with",
      value: BaseTriggerFilterTextValueExpressionEnum.StartsWith,
    },
    {
      label: "doesn't start with",
      value: BaseTriggerFilterTextValueExpressionEnum.DosentStartWith,
    },
    {
      label: "ends with",
      value: BaseTriggerFilterTextValueExpressionEnum.EndsWith,
    },

    {
      label: "doesn't ends with",
      value: BaseTriggerFilterTextValueExpressionEnum.DosentEndsWith,
    },
    {
      label: "is set",
      value: BaseTriggerFilterTextValueExpressionEnum.IsSet,
    },
    {
      label: "is not set",
      value: BaseTriggerFilterTextValueExpressionEnum.IsNotSet,
    },
  ];

export const triggerFilterNumberValueExpressionSelectOptions: ComboBoxProps["options"] =
  [
    {
      label: "equals",
      value: BaseTriggerFilterNumberValueExpressionEnum.Equals,
    },
    {
      label: "doesn't Equals",
      value: BaseTriggerFilterNumberValueExpressionEnum.DosentEqual,
    },
    {
      label: "is at least",
      value: BaseTriggerFilterNumberValueExpressionEnum.IsAtleast,
    },
    {
      label: "is at most",
      value: BaseTriggerFilterNumberValueExpressionEnum.IsAtMost,
    },
    {
      label: "is greater than",
      value: BaseTriggerFilterNumberValueExpressionEnum.IsGreaterThan,
    },
    {
      label: "is less than",
      value: BaseTriggerFilterNumberValueExpressionEnum.IsLessThan,
    },
  ];

export const triggerFilterListValueSelectOptions: ComboBoxProps["options"] = [
  {
    label: "contains",
    value: BaseTriggerFilterListValueExpressionEnum.Contains,
  },
  {
    label: "doesn't contain",
    value: BaseTriggerFilterListValueExpressionEnum.DosentContain,
  },
  {
    label: "is empty",
    value: BaseTriggerFilterListValueExpressionEnum.IsEmpty,
  },
  {
    label: "has atlease one item",
    value: BaseTriggerFilterListValueExpressionEnum.HasAtleastOneItem,
  },
  {
    label: "has at least",
    value: BaseTriggerFilterListValueExpressionEnum.HasAtleast,
  },
  {
    label: "has at most",
    value: BaseTriggerFilterListValueExpressionEnum.HasAtmost,
  },
  {
    label: "has more than",
    value: BaseTriggerFilterListValueExpressionEnum.HasMoreThan,
  },
  {
    label: "has fewer than",
    value: BaseTriggerFilterListValueExpressionEnum.HasFewerThan,
  },
];

export const triggerFilterBoolenValueExpressionSelectOptions: ComboBoxProps["options"] =
  [
    {
      label: "is True",
      value: "true",
    },
    {
      label: "is False",
      value: "false",
    },
  ];
