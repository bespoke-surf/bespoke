import { registerEnumType } from '@nestjs/graphql';

export enum SubscriberEmailStatus {
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED', // unsubed during email based flow
  MARKED_AS_SPAM = 'MARKED_AS_SPAM',
}

registerEnumType(SubscriberEmailStatus, {
  name: 'SubscriberEmailStatus',
  description: 'subscrber email status',
});
