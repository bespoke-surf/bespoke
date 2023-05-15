import { Field, InputType } from '@nestjs/graphql';
import { ImageInput } from './ImageInput';

@InputType({ description: 'update post input' })
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  subTitle?: string;

  @Field(() => String, { nullable: true })
  bodyLexical?: string;

  @Field(() => String, { nullable: true })
  bodyHTML?: string;

  @Field(() => String)
  postId: string;

  @Field(() => ImageInput, { nullable: true })
  image?: ImageInput;
}
