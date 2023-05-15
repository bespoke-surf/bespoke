import { Field, InputType } from '@nestjs/graphql';
import { ProductImageInput } from './productImageInput';

@InputType({ description: 'add more product images' })
export class AddMoreProductImagesInput {
  @Field(() => ProductImageInput)
  image: [ProductImageInput];

  @Field()
  productId: string;
}
