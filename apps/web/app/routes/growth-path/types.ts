import type {
  BillingFragment,
  IntegrationFragment,
} from "../../graphql/__generated__/graphql";

export type GrowthPathData = {
  billing: BillingFragment | null | undefined;
  subscriberCount: number | null | undefined;
  integration: IntegrationFragment | null | undefined;
};
