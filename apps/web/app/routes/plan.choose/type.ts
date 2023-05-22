export enum PlanChooseActionEnum {
  createCheckoutSessionUrl = "createCheckoutSessionUrl",
  prorateStripeSubscription = "prorateStripeSubscription",
  getCustomerPortalSession = "getCustomerPortalSession",
  updateToFreePlan = "updateToFreePlan",
}

export interface IActionData {
  notifyProrated: boolean;
}
