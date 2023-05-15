import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionPlanType {
  UNSBUSCRIBED = 'unsubscribed',
  PRO_MONTHLY = 'pro-monthly',
  PRO_YEARLY = 'pro-yearly',
  PAUSE_MONTHLY = 'pause-monthly',
}

registerEnumType(SubscriptionPlanType, {
  name: 'StorePlanType',
  description: 'different types of subscription',
});
