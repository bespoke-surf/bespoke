import * as yup from "yup";
import type {
  BillingFragment,
  GetBenchmarkDataQuery,
  GetStoreDailyRevenueTrendQuery,
  GetStoreEmailMetricQuery,
  GetStoreRevenueQuery,
} from "../../graphql/__generated__/graphql";
import { AboutIndustryEnum } from "../../graphql/__generated__/graphql";

export type DashboardData = {
  billing: BillingFragment | null | undefined;
  emailMetricPromise: Promise<GetStoreEmailMetricQuery>;
  benchmarkDataPromise: Promise<GetBenchmarkDataQuery>;
  // storeRevenuePromise: Promise<GetStoreRevenueQuery>;
  // storeDailyRevenuePromise: Promise<GetStoreDailyRevenueTrendQuery>;
};

export interface DashboardIndexData {
  revenuePromise: Promise<
    [GetStoreRevenueQuery, GetStoreDailyRevenueTrendQuery]
  >;
  emailMetricPromise: Promise<GetStoreEmailMetricQuery>;
  benchmarkDataPromise: Promise<GetBenchmarkDataQuery>;
}

export const UpdateIndustrySchema = yup.object().shape({
  industry: yup
    .mixed()
    .oneOf(Object.keys(AboutIndustryEnum), "select an industry")
    .required("select an industry"),
});

export enum DashboardActionEnum {
  updateIndustry = "updateInudstry",
}
