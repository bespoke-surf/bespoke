import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'create send email node' })
export class CreateSendEmailNodeInput {
  @Field()
  workflowId: string;

  @Field()
  workflowStateId: string;

  @Field()
  storeId: string;

  @Field(() => Boolean)
  otherWise: boolean;
}
