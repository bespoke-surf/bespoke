import { registerEnumType } from '@nestjs/graphql';

export enum QuestType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MILESTONE = 'MILESTONE',
  CUSTOME = 'CUSTOME',
}

registerEnumType(QuestType, {
  name: 'QuestType',
  description: 'quest type',
});
