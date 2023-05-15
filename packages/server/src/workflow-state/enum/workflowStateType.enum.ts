import { registerEnumType } from '@nestjs/graphql';

export enum WorkflowStateType {
  START = 'START',
  NORMAL = 'NORMAL',
  COMPLETE = 'COMPLETE',
  DENIED = 'DENIED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(WorkflowStateType, {
  name: 'WorkflowStateType',
  description: 'different workflwo state types',
});
