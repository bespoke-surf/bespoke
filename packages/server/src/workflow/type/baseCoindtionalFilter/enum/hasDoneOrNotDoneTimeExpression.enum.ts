import { registerEnumType } from '@nestjs/graphql';

export enum BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum {
  OVER_ALL_TIME = 'OVER_ALL_TIME',
  IN_THE_LAST = 'IN_THE_LAST',
  BETWEEN = 'BETWEEN',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  BETWEEN_DATES = 'BETWEEN_DATES',
  SINCE_STARTING_THIS_FLOW = 'SINCE_STARTING_THIS_FLOW',
}

registerEnumType(BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum, {
  name: 'BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum',
  description: 'different workflwo flow filters inequality expressions',
});
