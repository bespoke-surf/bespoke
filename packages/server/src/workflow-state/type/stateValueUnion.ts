import { createUnionType } from '@nestjs/graphql';
import { WorkflowStateConditionalSplitActivityValue } from './stateConditionalSplitValue';
import { WorkflowStateDelayActivityValue } from './stateDelayValue';
import { WorkflowStateSendEmailActivityValue } from './stateEmailValue';
import { WorkflowStateListTriggerActivityValue } from './stateListValue';
import { WorkflowStateMetricTriggerActivityValue } from './stateMetricValue';
import { WorkflowStateTriggerSplitActivityValue } from './triggerSplitValues';

export const WorkflowStateValueUnion = createUnionType({
  name: 'WorkflowStateValueUnion',
  types: () =>
    [
      WorkflowStateListTriggerActivityValue,
      WorkflowStateDelayActivityValue,
      WorkflowStateSendEmailActivityValue,
      WorkflowStateMetricTriggerActivityValue,
      WorkflowStateConditionalSplitActivityValue,
      WorkflowStateTriggerSplitActivityValue,
    ] as const,
  resolveType(
    value:
      | WorkflowStateListTriggerActivityValue
      | WorkflowStateDelayActivityValue
      | WorkflowStateSendEmailActivityValue
      | WorkflowStateMetricTriggerActivityValue
      | WorkflowStateConditionalSplitActivityValue
      | WorkflowStateTriggerSplitActivityValue,
  ) {
    if ('listId' in value) {
      return WorkflowStateListTriggerActivityValue;
    }
    if ('delayType' in value) {
      return WorkflowStateDelayActivityValue;
    }
    if ('postId' in value) {
      return WorkflowStateSendEmailActivityValue;
    }

    if ('metricType' in value) {
      return WorkflowStateMetricTriggerActivityValue;
    }

    if ('flowFilter' in value) {
      return WorkflowStateConditionalSplitActivityValue;
    }

    if ('triggerFilter' in value) {
      return WorkflowStateTriggerSplitActivityValue;
    }
    if ('html' in value) {
      return WorkflowStateSendEmailActivityValue;
    }

    return null;
  },
});
