import { registerEnumType } from '@nestjs/graphql';

export enum StoreStatusType {
  UNSUBSCRBED_TRIALING = 'unsubscribed_trialing',
  UNSUBSCRBED_TRIALING_ENDED = 'unsubscribed_trialing_ended',
  TIRALING = 'trialing',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
  ERROR = 'error',
}

registerEnumType(StoreStatusType, {
  name: 'StoreStatusType',
  description: 'different types of subscription',
});
