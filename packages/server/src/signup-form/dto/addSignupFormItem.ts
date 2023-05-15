import { Field, InputType } from '@nestjs/graphql';
import { SignupForm } from '../signup-form.entity';

@InputType({ description: 'add signup form item' })
export class AddSignupFormItem implements Partial<SignupForm> {
  @Field()
  storeId: string;

  @Field()
  itemId: string;

  @Field()
  listId: string;
}
