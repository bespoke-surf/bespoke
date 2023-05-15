import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'benchmark data' })
export class BenchmarkData {
  @Field(() => String)
  id: string;

  @Field()
  opened: string;

  @Field()
  contact: string;

  @Field()
  clicked: string;

  @Field()
  delivered: string;
}
