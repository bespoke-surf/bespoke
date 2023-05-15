import { Field, InputType, Int } from '@nestjs/graphql';
import { CDNType } from '../enum/cdnType.enum';

@InputType({ description: 'product image' })
export class ProductImageInput {
  @Field()
  src: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  width: number;

  @Field()
  mimeType: string;

  @Field(() => CDNType)
  cdnType: CDNType;
}
