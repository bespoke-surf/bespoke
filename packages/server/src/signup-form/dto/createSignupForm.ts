import { Field, InputType } from '@nestjs/graphql';
import { SignupForm } from '../signup-form.entity';

@InputType({ description: 'add signup form input' })
export class CreateSignupFormInput implements Partial<SignupForm> {
  @Field()
  storeId: string;

  @Field()
  listId: string;

  @Field()
  name: string;
}
