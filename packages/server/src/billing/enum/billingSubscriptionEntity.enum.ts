import { registerEnumType } from '@nestjs/graphql';

export enum BillingSubscriptionEntity {
  STRIPE = 'stripe',
  SHOPIFY = 'shopify',
}

registerEnumType(BillingSubscriptionEntity, {
  name: 'BillingSubscriptionEntity',
  description: 'different entities used for billing subscription',
});
