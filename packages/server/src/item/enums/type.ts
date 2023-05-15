import { registerEnumType } from '@nestjs/graphql';

export enum ItemTypeEnum {
  EMAIL_TEMPLATE = 'EMAIL_TEMPLATE',
  SIGNUP_FORM = 'SIGNUP_FORM',
  CREDITS = 'CREDITS',
}

registerEnumType(ItemTypeEnum, {
  name: 'ItemTypeEnum',
  description: 'different item types',
});
