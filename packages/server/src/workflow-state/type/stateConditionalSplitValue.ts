import { Field, ObjectType } from '@nestjs/graphql';
import { BaseConditionalFilter } from '../../workflow/type/baseCoindtionalFilter/baseConditionalFilter';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class WorkflowStateConditionalSplitActivityValue {
  @Field(() => [[BaseConditionalFilter]])
  flowFilter: BaseConditionalFilter[][];
}
