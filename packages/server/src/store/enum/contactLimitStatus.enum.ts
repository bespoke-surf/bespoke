import { registerEnumType } from '@nestjs/graphql';

export enum ContactLimitStatus {
  BRINK_OF_DISSALWOED = 'brink_of_disallowed',
  ALLOWED = 'allowed',
  DISALLOWED = 'disallowed',
}

registerEnumType(ContactLimitStatus, {
  name: 'ContactLimitStatus',
  description: 'contact limit status',
});
