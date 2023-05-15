import { registerEnumType } from '@nestjs/graphql';

export enum DelayTypeEnum {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  HOURS = 'HOURS',
  MINUTES = 'MINUTES',
}

registerEnumType(DelayTypeEnum, {
  name: 'DelayTypeEnum',
  description: 'different workflwo flow filters inequality expressions',
});
