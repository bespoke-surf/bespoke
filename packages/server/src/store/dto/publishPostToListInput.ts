import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'publish post to list' })
export class PublishPostToListInput {
  @Field(() => String)
  postId: string;

  @Field(() => String)
  listId: string;

  @Field(() => String)
  postHandle: string;
}
