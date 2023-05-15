import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'update store details input' })
export class UpdateDisplayPictureInput {
  @Field(() => String)
  storeId: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  width: number;

  @Field(() => String)
  url: string;
}
