import { registerEnumType } from '@nestjs/graphql';

export enum WorkflowNodeType {
  TriggerNode = 'TriggerNode',
  TriggerNodeDisabled = 'TriggerNodeDisabled',
  DelayNode = 'DelayNode',
  SendEmailNode = 'SendEmailNode',
  ConditionalSplitNode = 'ConditionalSplitNode',
  TriggerSplitNode = 'TriggerSplitNode',
}

registerEnumType(WorkflowNodeType, {
  name: 'WorkflowNodeType',
  description: 'different workflwo node types',
});
