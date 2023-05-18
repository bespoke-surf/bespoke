import type { BillingFragment } from "../../graphql/__generated__/graphql";

export type DashboardData = {
  billing: BillingFragment | null | undefined;
  // storeRevenuePromise: Promise<GetStoreRevenueQuery>;
  // storeDailyRevenuePromise: Promise<GetStoreDailyRevenueTrendQuery>;
};
