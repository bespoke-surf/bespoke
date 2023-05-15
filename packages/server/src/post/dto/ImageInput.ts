import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ImageInput {
  @Field()
  src: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;
}
