import { registerEnumType } from '@nestjs/graphql';

export enum CDNType {
  CLOUDINARY = 'CLOUDINARY',
  SHOPIFY = 'SHOPIFY',
}

registerEnumType(CDNType, {
  name: 'CDNType',
  description: 'CDN type of imags',
});
