import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductType } from '../enum/productType.enum';
import { Product } from '../product.entity';
import { ProductFileInput } from './productFileInput';

@InputType({ description: 'update product details' })
export class UpdateProductDetailsInput implements Partial<Product> {
  @Field()
  productId: string;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  description: string;

  @Field(() => ProductType)
  productType: ProductType;

  @Field(() => Int, { nullable: true })
  hours?: number;

  @Field(() => Int, { nullable: true })
  minutes?: number;

  @Field(() => [ProductFileInput], { nullable: true })
  files?: ProductFileInput[];
}
