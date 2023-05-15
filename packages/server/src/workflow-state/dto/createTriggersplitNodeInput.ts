import { Field, InputType } from '@nestjs/graphql';
import { WorkflowTriggerFilterInput } from '../../workflow/dto/updateTriggerFilterInput';

@InputType({ description: 'update store details input' })
export class CreateTriggerSplitNodeInput {
  @Field(() => String)
  workflowId: string;

  @Field(() => String)
  workflowStateId: string;

  @Field(() => Boolean)
  otherWise: boolean;

  @Field(() => [[WorkflowTriggerFilterInput]])
  triggerFilter: WorkflowTriggerFilterInput[][];
}
