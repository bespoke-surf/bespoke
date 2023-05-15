import { registerEnumType } from '@nestjs/graphql';

export enum EmailConcentState {
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
}

registerEnumType(EmailConcentState, {
  name: 'EmailConcentState',
  description: 'email concent state',
});
