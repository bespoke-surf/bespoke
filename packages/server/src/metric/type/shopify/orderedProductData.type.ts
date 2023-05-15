import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../../enum/metric-type.enum';

@ObjectType()
export class MetricShopifyOrderedProduct {
  @Field(() => MetricTypeEnum)
  type: MetricTypeEnum;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  sku: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  vendor: string;

  @Field(() => String, { nullable: true })
  variant_title?: string | null;
}
