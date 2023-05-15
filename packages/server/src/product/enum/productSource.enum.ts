import { registerEnumType } from '@nestjs/graphql';

export enum ProductSource {
  WEB = 'WEB',
  SHOPIFY = 'SHOPIFY',
}

registerEnumType(ProductSource, {
  name: 'ProductSource',
  description: 'source of the products',
});
