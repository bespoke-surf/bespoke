import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetricShopifyShippingLines {
  @Field()
  code: string;
}

@ObjectType()
export class MetricShopifyDiscountCodes {
  @Field()
  code: string;

  @Field()
  amount: string;

  @Field()
  type: string;
}

@ObjectType()
export class MetricShopifyLineItems {
  @Field()
  id: number;

  @Field()
  price: string;

  @Field()
  name: string;

  @Field()
  key: string;

  @Field(() => Int)
  product_id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  compare_at_price?: string;
}
