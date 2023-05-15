import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WorkflowActivityType } from '../../workflow-state/enum/workflowActivityType.enum';
import { WorkflowStateType } from '../../workflow-state/enum/workflowStateType.enum';
import { WorkflowStateValueUnion } from '../../workflow-state/type/stateValueUnion';
import { WorkflowState } from '../../workflow-state/workflow-state.entity';
import { WorkflowNodeType } from '../enum/workflowNodeType.enum';

@ObjectType({
  description: 'XYPosition',
})
export class WorkflowNodeXYPostion {
  @Field()
  x: number;

  @Field()
  y: number;
}

@ObjectType({
  description: 'XYPosition',
})
export class WorkflowNodeData implements Partial<WorkflowState> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => WorkflowStateValueUnion)
  value: typeof WorkflowStateValueUnion;

  @Field()
  workflowStateType: WorkflowStateType;

  @Field()
  workflowActivityType: WorkflowActivityType;
}

@ObjectType({
  description: 'Workflow Node Type',
})
export class WorkflowNode {
  @Field(() => ID)
  id: string;

  @Field()
  position: WorkflowNodeXYPostion;

  @Field(() => WorkflowNodeData)
  data: WorkflowNodeData;

  @Field(() => WorkflowNodeType)
  type: WorkflowNodeType;
}
