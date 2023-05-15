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
@ObjectType()
export class ShopifyProductVariantNode {
  @Field(() => ShopifyProductVariant)
  node: ShopifyProductVariant;
}
@ObjectType()
export class ShopifyProductVariantEdges {
  @Field(() => [ShopifyProductVariantNode])
  edges: ShopifyProductVariantNode[];
}

@ObjectType()
export class ShopifyProductDataOptions {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  position: number;

  @Field(() => [String])
  values: string[];
}

@ObjectType()
export class ShopifyProductData {
  @Field()
  id: string;

  @Field()
  handle: string;

  @Field(() => Int)
  totalInventory: number;

  @Field(() => [ShopifyProductDataOptions])
  options: ShopifyProductDataOptions[];

  @Field(() => [ShopifyProductDataImage], { nullable: true })
  images?: ShopifyProductDataImage[];

  @Field(() => ShopifyProductVariantEdges)
  variants: ShopifyProductVariantEdges;
}
