import { Field, InputType } from '@nestjs/graphql';
import { WorkflowFlowFilterInput } from '../../workflow/dto/updateFlowFilterInput';

@InputType({ description: 'update store details input' })
export class UpdateConditionalSplitStateInput {
  @Field(() => String)
  workflowStateId: string;

  @Field(() => [[WorkflowFlowFilterInput]])
  flowFilter: WorkflowFlowFilterInput[][];
}
