import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterListValueExpressionEnum {
  CONTAINS = 'CONTAINS',
  DOSENT_CONTAIN = 'DOSENT_CONTAIN',
  IS_EMPTY = 'IS_EMPTY',
  HAS_ATLEAST_ONE_ITEM = 'HAS_ATLEAST_ONE_ITEM',
  HAS_ATLEAST = 'HAS_ATLEAST',
  HAS_ATMOST = 'HAS_ATMOST',
  HAS_MORE_THAN = 'HAS_MORE_THAN',
  HAS_FEWER_THAN = 'HAS_FEWER_THAN',
}

registerEnumType(BaseTriggerFilterListValueExpressionEnum, {
  name: 'BaseTriggerFilterListValueExpressionEnum',
  description: 'different workflwo flow filters inequality expressions',
});
