import { createUnionType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../enum/metric-type.enum';
import { MetricEmailLinkClicked } from '../type/emailLinkClickedEvent.type';
import { MetricPostViewed } from '../type/postviewed.type';
import { MetricShopifyCancelledOrder } from '../type/shopify/cancelledOrderData.type';
import { MetricShopifyFulfilledOrder } from '../type/shopify/fulfilledOrderData.type';
import { MetricShopifyPlacedOrder } from '../type/shopify/placedOrderData.type';
import { MetricShopifyRefundedOrder } from '../type/shopify/refundedOrderData.type';
import { MetricShopifyCheckoutUpdate } from '../type/shopify/shopifycheckoutUpdateData.type';

export const MetricData = createUnionType({
  name: 'MetricData',
  types: () =>
    [
      MetricShopifyPlacedOrder,
      MetricShopifyCheckoutUpdate,
      MetricShopifyFulfilledOrder,
      MetricShopifyCancelledOrder,
      MetricEmailLinkClicked,
      MetricPostViewed,
    ] as const,
  resolveType(value: { type: MetricTypeEnum }) {
    if (value.type === MetricTypeEnum.EMAIL_LINK_CLICKED) {
      return MetricEmailLinkClicked;
    }
    if (value.type === MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED) {
      return MetricShopifyCheckoutUpdate;
    }
    if (value.type === MetricTypeEnum.SHOPIFY_FULFILLED_ORDER) {
      return MetricShopifyFulfilledOrder;
    }
    if (value.type === MetricTypeEnum.SHOPIFY_PLACED_ORDER) {
      return MetricShopifyPlacedOrder;
    }
    if (value.type === MetricTypeEnum.SHOPIFY_CANCELLED_ORDER) {
      return MetricShopifyCancelledOrder;
    }
    if (value.type === MetricTypeEnum.POST_VIEWED) {
      return MetricPostViewed;
    }
    if (value.type === MetricTypeEnum.SHOPIFY_REFUNDED_ORDER) {
      return MetricShopifyRefundedOrder;
    }

    return null;
  },
});
