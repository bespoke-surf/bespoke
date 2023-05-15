import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'email login input' })
export class EmailLoginInput {
  @Field(() => String)
  @IsEmail()
  email: string;
}
