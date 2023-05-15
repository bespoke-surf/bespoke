import { registerEnumType } from '@nestjs/graphql';

export enum BaseTriggerFilterTypeEnum {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  LIST = 'LIST',
}

registerEnumType(BaseTriggerFilterTypeEnum, {
  name: 'BaseTriggerFilterTypeEnum',
  description: 'different workflow trigger filters',
});
