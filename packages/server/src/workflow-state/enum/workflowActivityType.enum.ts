import { registerEnumType } from '@nestjs/graphql';

export enum WorkflowActivityType {
  LIST_TRIGGER = 'LIST_TRIGGER',
  METRIC_TRIGGER = 'METRIC_TRIGGER',
  SEND_EMAIL = 'SEND_EMAIL',
  DELAY = 'DELAY',
  CONDITIONAL_SPLIT = 'CONDITIONAL_SPLIT',
  TRIGGER_SPLIT = 'TRIGGER_SPLIT',
}

registerEnumType(WorkflowActivityType, {
  name: 'WorkflowActivityType',
  description: 'different workflwo activity type',
});
