import { registerEnumType } from '@nestjs/graphql';

export enum BillingSubscriptionStatus {
  // free state
  UNSUBSCRIBED = 'unsubscribed',

  //active state
  ACTIVE = 'active',
  PAST_DUE = 'past_due',

  // pending
  INCOMPLETE = 'incomplete',

  //cancelled
  CANCELED = 'canceled',
  INCOMPLETE_EXPIRED = 'incomplete_expired',

  // will never reach here, set to can after past due
  UNPAID = 'unpaid',
  TRIALING = 'trialing',
}

registerEnumType(BillingSubscriptionStatus, {
  name: 'BillingSubscriptionStatus',
  description: 'different types of billing plan status',
});
