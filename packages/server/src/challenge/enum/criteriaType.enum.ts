import { registerEnumType } from '@nestjs/graphql';

export enum ChallengeMeasuredValueUnit {
  PERCENTAGE = 'PERCENTAGE',
  RATE = 'RATE',
}

registerEnumType(ChallengeMeasuredValueUnit, {
  name: 'ChallengeMeasuredValueUnit',
  description: 'different types of challenges',
});
