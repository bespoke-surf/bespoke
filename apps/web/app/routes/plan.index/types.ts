export enum PlanIndexActionEnum {
  createShopifyAppSubscription = "createShopifyAppSubscription",
  getCustomerPortalSession = "getCustomerPortalSession",
}

export type GrowthPathChooseData = {
  subscriberAddedTodayCount: number | null | undefined;
  emailSentTodayCount: number | null | undefined;
  emailSentThisMonthCount: number | null | undefined;
};
