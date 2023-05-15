import { registerEnumType } from '@nestjs/graphql';

export enum EmailDeliveryStatus {
  SUBSCRIBED = 'SUBSCRIBED',
  BOUNCED = 'BOUNCED',
}

registerEnumType(EmailDeliveryStatus, {
  name: 'EmailDeliveryStatus',
  description: 'email delivery status',
});
