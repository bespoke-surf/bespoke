import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterDateValueExpressionEnum {
  IS_IN_THE_LAST = 'IS_IN_THE_LAST',
  IS_AT_LEAST = 'IS_AT_LEAST',
  IS_BETWEEN = 'IS_BETWEEN',
  IS_IN_THE_NEXT = 'IS_IN_THE_NEXT',
  IS_BEFORE = 'IS_BEFORE',
  IS_AFTER = 'IS_AFTER',
  IS_BETWEEN_DATES = 'IS_BETWEEN_DATES',
  DAY_IS_TODAY = 'DAY_IS_TODAY',
  DAY_IS_IN_THE_NEXT = 'DAY_IS_THE_NEXT',
  DAY_IS_IN_THE_LAST = 'DAY_IS_THE_LAST',
  DAY_IS_IN_THIS_MONTH = 'DAY_IS_THIS_MONTH',
  DAY_IS_IN_MONTH_OFF = 'DAY_IS_MONTH_OFF',
}

registerEnumType(BaseTriggerFilterDateValueExpressionEnum, {
  name: 'BaseTriggerFilterDateValueExpressionEnum',
  description: 'different workflwo flow filters inequality expressions',
});
