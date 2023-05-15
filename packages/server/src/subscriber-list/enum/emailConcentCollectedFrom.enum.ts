import { registerEnumType } from '@nestjs/graphql';

export enum EmailConcentCollectedFrom {
  SIGNUP_FORM = 'SIGNUP_FORM',
  LANDING_PAGE = 'LANDING_PAGE',
  IMPORT = 'IMPORT',
  OTHER = 'OTHER',
}

registerEnumType(EmailConcentCollectedFrom, {
  name: 'EmailConcentCollectedFrom',
  description: 'email concent collected from',
});
