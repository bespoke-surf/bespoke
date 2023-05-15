import { Field, InputType } from '@nestjs/graphql';
import { SignupFormState } from '../enum/signupFormState.enum';
import { SignupForm, SignupFormData } from '../signup-form.entity';
import { SignupFormDataInput } from './signupFormDataInput';

@InputType({ description: 'add signup form input' })
export class UpdateSignupformInput implements Partial<SignupForm> {
  @Field()
  signupFormId: string;

  @Field()
  name: string;

  @Field(() => SignupFormState)
  formState: SignupFormState;

  @Field()
  scriptModule: string;

  @Field()
  scriptJavascript: string;

  @Field(() => SignupFormDataInput)
  form: SignupFormData;

  @Field(() => SignupFormDataInput)
  success: SignupFormData;
}
