import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterDimensionEnum {
  DISCOUNT_CODES = 'DISCOUNT_CODES',
  ITEM_COUNT = 'ITEM_COUNT',
  ITEMS = 'ITEMS',
  SHIPPING_RATE = 'SHIPPING_RATE',
  SOURCE_NAME = 'SOURCE_NAME',
  TOTAL_DISCOUNTS = 'TOTAL_DISCOUNTS',
  DOLLAR_VALUE = 'DOLLAR_VALUE',
  NAME = 'NAME',
  PRODUCT_ID = 'PRODUCT_ID',
  QUANTITY = 'QUANTITY',
  SKU = 'SKU',
  VARIANT_NAME = 'VARIANT_NAME',
  VENDOR = 'VENDOR',
}

registerEnumType(BaseTriggerFilterDimensionEnum, {
  name: 'BaseTriggerFilterDimensionEnum',
  description: 'different workflow trigger filters',
});
