import type { MetricUtmDataType } from "../graphql/__generated__/graphql";

const campaignKeyMap = {
  utm_campaign: "campaign",
  utm_source: "source",
  utm_term: "term",
  utm_medium: "medium",
  utm_count: "content",
};

export const parseCampaign = (
  requestQuery: string
): MetricUtmDataType | null => {
  const query = new URL(requestQuery).searchParams;
  const campaign = {};

  for (let [key, value] of Object.entries(campaignKeyMap)) {
    //@ts-ignore
    campaign[value] = query.get(key);
  }

  if (Object.values(campaign).length > 0) {
    return campaign;
  }
  return null;
};
