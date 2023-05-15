import { createUnionType } from '@nestjs/graphql';
import { BaseTriggerFilterBooleanValue } from './booleanType';
import { BaseTriggerFilterDateValue } from './dateType';
import { BaseTriggerFilterListValue } from './listType';
import { BaseTriggerFilterNumberValue } from './numberTypeValue';
import { BaseTriggerFilterTextValue } from './textTypeValue';

export const BaseTriggerFilterValueUnion = createUnionType({
  name: 'BaseTriggerFilterValueUnion',
  types: () =>
    [
      BaseTriggerFilterTextValue,
      BaseTriggerFilterNumberValue,
      BaseTriggerFilterDateValue,
      BaseTriggerFilterBooleanValue,
      BaseTriggerFilterListValue,
    ] as const,
  resolveType(value) {
    if ('textExpression' in value) {
      return BaseTriggerFilterTextValue;
    }
    if ('numberExpression' in value) {
      return BaseTriggerFilterNumberValue;
    }
    if ('dateExpression' in value) {
      return BaseTriggerFilterDateValue;
    }
    if ('booleanValue' in value) {
      return BaseTriggerFilterBooleanValue;
    }
    if ('listExpression' in value) {
      return BaseTriggerFilterListValue;
    }

    return null;
  },
});
