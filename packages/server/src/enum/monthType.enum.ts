import { registerEnumType } from '@nestjs/graphql';

export enum MonthTypeEnum {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

registerEnumType(MonthTypeEnum, {
  name: 'MonthTypeEnum',
  description: 'different months of the year',
});
