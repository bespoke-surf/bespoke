import type {
  IntegrationFragment,
  MetricFragment,
} from "../../graphql/__generated__/graphql";

export type DashboardActivityFeedData = {
  metrics: MetricFragment[] | null | undefined;
  integrations: IntegrationFragment | null | undefined;
};

export const DASHBOARD_SUBSCRIBER_METRIC_TAKE = 20;
export const WAYPOINT_TRIGGER_AT = 5;
