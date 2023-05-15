import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ShopifyProductDataImage } from './shopifyProductDataImage';

@ObjectType()
export class ShopifyProductVariantSlectedOptions {
  @Field()
  name: string;

  @Field()
  value: string;
}

@ObjectType()
export class ShopifyProductVariant {
  @Field()
  title: string;

  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  compareAtPrice?: number;

  @Field()
  position: number;

  @Field(() => Int)
  price: number;

  @Field(() => ShopifyProductDataImage, { nullable: true })
  image?: ShopifyProductDataImage | null | undefined;

  @Field(() => [ShopifyProductVariantSlectedOptions])
  selectedOptions: ShopifyProductVariantSlectedOptions[];

  @Field(() => String, { nullable: true })
  sku?: string | null | undefined;
}
