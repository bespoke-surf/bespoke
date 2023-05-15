import type { IntegrationFragment } from "~/graphql/__generated__/graphql";

export interface IntegrationData {
  integration: IntegrationFragment | null | undefined;
}
