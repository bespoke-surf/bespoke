import { registerEnumType } from '@nestjs/graphql';

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  INACTIVE = 'INACTIVE',
  LIVE = 'LIVE',
}

registerEnumType(WorkflowStatus, {
  name: 'WorkflowStatus',
  description: 'different workflwo status',
});
