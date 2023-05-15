import { registerEnumType } from '@nestjs/graphql';

export enum BaseConditionalFilterConditionEnum {
  HAS_DONE_OR_NOT_DONE = 'HAS_DONE_OR_NOT_DONE',
  IS_IN_LIST_OR_NOT = 'IS_IN_LIST_OR_NOT',
  HAS_NOT_BEEN_IN_THIS_FLOW = 'HAS_NOT_BEEN_IN_THIS_FLOW',
}

registerEnumType(BaseConditionalFilterConditionEnum, {
  name: 'BaseConditionalFilterConditionEnum',
  description: 'different workflwo flow filters',
});
