import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'create user with email input' })
export class CreateUserWithEmailInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;
}
