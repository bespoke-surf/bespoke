import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'create send email' })
export class CreateSendEmailNodeInput {
  @Field(() => String)
  workflowId: string;

  @Field(() => String)
  type: 'simple' | 'complex';

  @Field(() => String)
  design: string;

  @Field(() => String)
  html: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  workflowStateId: string;

  @Field(() => Boolean)
  otherWise: boolean;
}
