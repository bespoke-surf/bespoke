import { Field, InputType } from '@nestjs/graphql';
import { WorkflowTriggerFilterInput } from '../../workflow/dto/updateTriggerFilterInput';

@InputType({ description: 'update store details input' })
export class UpdateTriggerSplitStateInput {
  @Field(() => String)
  workflowStateId: string;

  @Field(() => [[WorkflowTriggerFilterInput]])
  triggerFilter: WorkflowTriggerFilterInput[][];
}
