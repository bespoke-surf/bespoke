import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTriggerFilter } from '../../workflow/type/baseTriggerFilter/baseTriggerFilter';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class WorkflowStateTriggerSplitActivityValue {
  @Field(() => [[BaseTriggerFilter]])
  triggerFilter: BaseTriggerFilter[][];
}
