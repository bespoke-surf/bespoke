import { registerEnumType } from '@nestjs/graphql';

export enum ItemCategoryTypeEnum {
  FREE = 'FREE',
  SCUBSCRIPTION = 'SUBSCRIPTION',
  SHOP = 'SHOP',
}

registerEnumType(ItemCategoryTypeEnum, {
  name: 'ItemCategoryTypeEnum',
  description: 'item category type enum',
});
