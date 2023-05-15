import { registerEnumType } from '@nestjs/graphql';

export enum ChallengeTypeEnum {
  CHALLENGE = 'CHALLENGE',
}

registerEnumType(ChallengeTypeEnum, {
  name: 'ChallengeTypeEnum',
  description: 'different types of challenges',
});
