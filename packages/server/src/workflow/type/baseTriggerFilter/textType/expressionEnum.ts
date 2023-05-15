import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterTextValueExpressionEnum {
  EQUALS = 'EQUALS',
  DOSENT_EQUAL = 'DOSENT_EQUAL',
  CONTAINS = 'CONTAINS',
  DOSENT_CONTAIN = 'DOSENT_CONTAIN',
  IS_IN = 'IS_IN',
  IS_NOT_IN = 'IS_NOT_IN',
  STARTS_WITH = 'STARTS_WITH',
  DOSENT_START_WITH = 'DOSENT_START_WITH',
  ENDS_WITH = 'ENDS_WITH',
  DOSENT_ENDS_WITH = 'DOSENT_ENDS_WITH',
  IS_SET = 'IS_SET',
  IS_NOT_SET = 'IS_NOT_SET',
}

registerEnumType(BaseTriggerFilterTextValueExpressionEnum, {
  name: 'BaseTriggerFilterTextValueExpressionEnum',
  description: 'different text value expressions',
});
