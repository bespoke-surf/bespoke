import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'add comma speratedEmails to list input' })
export class AddCommaSeperatedEmailsToListInput {
  @Field(() => String)
  emails: string;

  @Field()
  storeId: string;

  @Field()
  listId: string;
}
