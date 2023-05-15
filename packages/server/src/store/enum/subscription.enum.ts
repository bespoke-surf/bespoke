import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusType {
  UNSBUSCRIBED = 'unsubscribed',
  TRIALING = 'trialing',
  ACTIVE = 'active',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
  INCOMPLETE = 'incomplete',
  PAST_DUE = 'past_due',
}

registerEnumType(SubscriptionStatusType, {
  name: 'SubscriptionStatusType',
  description: 'different types of subscription',
});
