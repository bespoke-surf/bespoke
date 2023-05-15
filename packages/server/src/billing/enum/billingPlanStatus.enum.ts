import { registerEnumType } from '@nestjs/graphql';

export enum BillingPlanStatus {
  FREE = 'free',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  PENDING = 'pending',
}

registerEnumType(BillingPlanStatus, {
  name: 'BillingPlanStatus',
  description: 'different types of subscription',
});
