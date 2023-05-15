import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductImageInput } from './productImageInput';

@InputType({ description: 'update shopify input' })
export class UpdateShopifyProductInput {
  @Field()
  id: string;

  @Field()
  externalLink: string;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => [ProductImageInput])
  image: ProductImageInput[];
}
