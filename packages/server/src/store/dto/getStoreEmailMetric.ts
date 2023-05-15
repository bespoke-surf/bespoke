import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetStoreEmailMetric {
  @Field(() => Int)
  opened: number;

  @Field(() => Int)
  delivered: number;

  @Field(() => Int)
  clicked: number;

  @Field(() => Int)
  contact: number;

  @Field(() => Float)
  deliveredTrend: number;

  @Field(() => Float)
  clickedTrend: number;

  @Field(() => Float)
  openedTrend: number;
}
