import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'update store details input' })
export class UpdateSendEmailStateInput {
  @Field(() => String)
  workflowStateId: string;

  @Field(() => String)
  type: 'simple' | 'complex';

  @Field(() => String)
  design: string;

  @Field(() => String)
  html: string;

  @Field(() => String)
  subject: string;
}
