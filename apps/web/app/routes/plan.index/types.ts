export enum PlanChooseActionEnum {
  createCheckoutSessionUrl = "createCheckoutSessionUrl",
  createShopifyAppSubscription = "createShopifyAppSubscription",
}

export type GrowthPathChooseData = {
  subscriberAddedTodayCount: number | null | undefined;
  emailSentTodayCount: number | null | undefined;
  emailSentThisMonthCount: number | null | undefined;
};
