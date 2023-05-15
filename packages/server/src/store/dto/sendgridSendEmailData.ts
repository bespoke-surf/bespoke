import { Field, InputType } from '@nestjs/graphql';
import { Post } from '../../post/post.entity';

@InputType({ description: 'sendgrid send email data' })
export class StoreSendEmailData {
  @Field(() => String)
  listId: string;

  @Field(() => Post)
  postData: Post;
}
