import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductSource } from '../enum/productSource.enum';
import { ProductType } from '../enum/productType.enum';
import { ProductImageInput } from './productImageInput';

@InputType({ description: 'create category input' })
export class CreateProductInput {
  @Field(() => ProductType)
  type: ProductType;

  @Field()
  storeId: string;

  @Field()
  externalLink: string;

  @Field(() => ProductSource)
  productSource: ProductSource;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => [ProductImageInput])
  image: ProductImageInput[];
}
