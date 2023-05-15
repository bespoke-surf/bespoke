import { registerEnumType } from '@nestjs/graphql';

export enum BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum {
  SHOPIFY_REFUNDED_ORDER = 'SHOPIFY_REFUNDED_ORDER',
  SHOPIFY_PLACED_ORDER = 'SHOPIFY_PLACED_ORDER',
  SHOPIFY_CHECKOUT_STARTED = 'SHOPIFY_CHECKOUT_STARTED',
  SHOPIFY_FULFILLED_ORDER = 'SHOPIFY_FULFILLED_ORDER',
  SHOPIFY_CANCELLED_ORDER = 'SHOPIFY_CANCELLED_ORDER',

  EMAIL_OPENED = 'EMAIL_OPENED',
  EMAIL_RECEIVED = 'EMAIL_RECEIVED',
  EMAIL_SENT = 'EMAIL_SENT',
  EMAIL_LINK_CLICKED = 'EMAIL_LINK_CLICKED',
  EMAIL_BOUNCED = 'EMAIL_BOUNCED',
  EMAIL_DROPPED = 'EMAIL_DROPPED',
  EMAIL_MARKED_AS_SPAM = 'EMAIL_MARKED_AS_SPAM',
  EMAIL_UNSUBSCRIBED = 'EMAIL_UNSUBSCRIBED',
}

registerEnumType(BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum, {
  name: 'BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum',
  description: 'different workflwo flow filters inequality expressions',
});
