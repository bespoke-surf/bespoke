import { registerEnumType } from '@nestjs/graphql';

export enum PurchasingTypeEnum {
  CREDITS = 'CREDITS',
}

registerEnumType(PurchasingTypeEnum, {
  name: 'PurchasingTypeEnum',
  description: 'purchasing type enum',
});
