import type {
  IntegrationFragment,
  MetricFragment,
} from "~/graphql/__generated__/graphql";

export const SUBSCRIBERS_METRIC_TAKE = 20;
export const WAYPOINT_TRIGGER_AT = 5;

export interface SubscribersSubscriberIndexData {
  emailReceivedCount: number | null | undefined;
  emailOpenedCount: number | null | undefined;
  emailLinkClickedCount: number | null | undefined;
  placedOrderCount: number | null | undefined;
  fulfilledOrderCount: number | null | undefined;
  metrics: MetricFragment[] | null | undefined;
  integration: IntegrationFragment | null | undefined;
}
