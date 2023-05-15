import { Field, InputType } from '@nestjs/graphql';
import { WorkflowFlowFilterInput } from '../../workflow/dto/updateFlowFilterInput';

@InputType({ description: 'update store details input' })
export class CreateConditionalSplitNodeInput {
  @Field(() => String)
  workflowId: string;

  @Field(() => String)
  workflowStateId: string;

  @Field(() => Boolean)
  otherWise: boolean;

  @Field(() => [[WorkflowFlowFilterInput]])
  flowFilter: WorkflowFlowFilterInput[][];
}
