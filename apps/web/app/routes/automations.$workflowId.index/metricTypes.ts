import type { ComboBoxItemType } from "gestalt";
import { MetricType } from "../../graphql/__generated__/graphql";

export const ALL_METRIC_VALUE = "all-metrics";

export const defaultOptions: ComboBoxItemType[] = [
  { label: "All Metrics", value: ALL_METRIC_VALUE },
  { label: "Bounced Email", value: MetricType.EmailBounced },
  { label: "Email Clicked", value: MetricType.EmailLinkClicked },
  { label: "Dropped Email", value: MetricType.EmailDropped },
  {
    label: "Email Sent",
    value: MetricType.EmailSent,
  },
  {
    label: "Email Marked As Spam",
    value: MetricType.EmailMarkedAsSpam,
  },
  { label: "Email Opened", value: MetricType.EmailOpened },
  { label: "Email Delivered", value: MetricType.EmailDelivered },
  {
    label: "Email Unsubscribed",
    value: MetricType.EmailUnsubscribed,
  },
];

export const shopifyOptions: ComboBoxItemType[] = [
  {
    label: "Checkout Started",
    value: MetricType.ShopifyCheckoutStarted,
    subtext: "Shopify",
  },
  {
    label: "Placed Order",
    value: MetricType.ShopifyPlacedOrder,
    subtext: "Shopify",
  },
  {
    label: "Ordered Product",
    value: MetricType.ShopifyOrderedProduct,
    subtext: "Shopify",
  },

  {
    label: "Fulfilled Order",
    value: MetricType.ShopifyFulfilledOrder,
    subtext: "Shopify",
  },
  {
    label: "Cancelled Order",
    value: MetricType.ShopifyCancelledOrder,
    subtext: "Shopify",
  },
  {
    label: "Refunded Order",
    value: MetricType.ShopifyRefundedOrder,
    subtext: "Shopify",
  },
];
