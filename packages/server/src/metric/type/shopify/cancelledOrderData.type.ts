import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../../enum/metric-type.enum';
import {
  MetricShopifyDiscountCodes,
  MetricShopifyLineItems,
  MetricShopifyShippingLines,
} from './common.type';

@ObjectType()
export class MetricShopifyCancelledOrder {
  @Field(() => MetricTypeEnum)
  type: MetricTypeEnum;

  @Field(() => Int)
  id: number;

  @Field()
  subtotal_price: string;

  @Field()
  total_price: string;

  @Field(() => [MetricShopifyDiscountCodes])
  discount_codes: MetricShopifyDiscountCodes[];

  @Field(() => String)
  source_name: string;

  @Field(() => String)
  total_discounts: string;

  @Field(() => [MetricShopifyLineItems])
  line_items: MetricShopifyLineItems[];

  @Field(() => [MetricShopifyShippingLines])
  shipping_lines: MetricShopifyShippingLines[];
}
