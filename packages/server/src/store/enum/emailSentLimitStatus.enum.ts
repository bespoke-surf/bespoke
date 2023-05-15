import { registerEnumType } from '@nestjs/graphql';

export enum EmailSentLimitStatus {
  BRINK_OF_DISSALWOED = 'brink_of_disallowed',
  ALLOWED = 'allowed',
  DISALLOWED = 'disallowed',
}

registerEnumType(EmailSentLimitStatus, {
  name: 'EmailSentLimitStatus',
  description: 'email sent limit status',
});
