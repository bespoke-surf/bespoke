import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterNumberValueExpressionEnum {
  EQUALS = 'EQUALS',
  DOSENT_EQUAL = 'DOSENT_EQUAL',
  IS_ATLEAST = 'IS_ATLEAST',
  IS_AT_MOST = 'IS_AT_MOST',
  IS_GREATER_THAN = 'IS_GREATER_THAN',
  IS_LESS_THAN = 'IS_LESS_THAN',
}

registerEnumType(BaseTriggerFilterNumberValueExpressionEnum, {
  name: 'BaseTriggerFilterNumberValueExpressionEnum',
  description: 'different number value expression',
});
