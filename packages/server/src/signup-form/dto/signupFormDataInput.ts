import { Field, InputType } from '@nestjs/graphql';
import { SignupFormData } from '../signup-form.entity';

@InputType()
export class SignupFormDataInput implements Partial<SignupFormData> {
  @Field()
  body: string;

  @Field()
  css: string;

  @Field()
  js: string;

  @Field()
  fonts: string;

  @Field()
  design: string;

  @Field()
  html: string;
}
