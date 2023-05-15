import { Field, InputType } from '@nestjs/graphql';
import { ImageInput } from './ImageInput';

@InputType({ description: 'create post input' })
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  subTitle?: string;

  @Field(() => String, { nullable: true })
  bodyLexical?: string;

  @Field(() => String, { nullable: true })
  bodyHTML?: string;

  @Field(() => ImageInput, { nullable: true })
  image?: ImageInput;

  @Field(() => String)
  storeId: string;
}
