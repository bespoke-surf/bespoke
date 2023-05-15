import { registerEnumType } from '@nestjs/graphql';

export enum BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum {
  AT_LEAST_ONCE = 'AT_LEAST_ONCE',
  ZERO_TIMES = 'ZERO_TIMES',
  EQUALS = 'EQUALS',
  DOESNT_EQUAL = 'DOESNT_EQUAL',
  IS_AT_LEAST = 'IS_AT_LEAST',
  IS_GREATER_THAN = 'IS_GREATER_THAN',
  IS_LESS_THAN = 'IS_LESS_THAN',
  IS_AT_MOST = 'IS_AT_MOST',
}

registerEnumType(
  BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
  {
    name: 'BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum',
    description: 'different workflwo flow filters inequality expressions',
  },
);
