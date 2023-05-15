import { registerEnumType } from '@nestjs/graphql';

export enum EmailConcentOptInLevel {
  SINGLE_OPT_IN = 'SINGLE_OPT_IN',
  SINGLE_OPT_IN_WITH_NOTIFICATION = 'SINGLE_OPT_IN_WITH_NOTIFICATION',
  CONFIRMED_OPT_IN = 'CONFIRMED_OPT_IN',
}

registerEnumType(EmailConcentOptInLevel, {
  name: 'EmailConcentOptInLevel',
  description: 'email concent opt in level',
});
