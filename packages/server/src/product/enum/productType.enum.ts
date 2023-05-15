import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
  SERVICE = 'SERVICE',
  PHYSICIAL_PRODUCT = 'PHYSICAL_PRODUCT',
  DIGITAL_PRODUCT = 'DIGITAL_PRODUCT',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
}

registerEnumType(ProductType, {
  name: 'ProductType',
  description: 'Diffrent types of products ',
});
