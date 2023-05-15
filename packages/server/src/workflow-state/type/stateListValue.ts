import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Workflow staet list trigger value',
})
export class WorkflowStateListTriggerActivityValue {
  @Field(() => ID)
  listId: string;
}
