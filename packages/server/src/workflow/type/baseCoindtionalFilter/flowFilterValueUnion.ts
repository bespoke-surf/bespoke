import { createUnionType } from '@nestjs/graphql';
import { BaseConditionalFilterHasDoneOrNotDoneValue } from './hasDoneOrNotDoneValue';

export const BaseConditionalFilterValueUnion = createUnionType({
  name: 'BaseConditionalFilterValueUnion',
  types: () => [BaseConditionalFilterHasDoneOrNotDoneValue] as const,
  resolveType(value) {
    if ('trigger' in value) {
      return BaseConditionalFilterHasDoneOrNotDoneValue;
    }
    return null;
  },
});
