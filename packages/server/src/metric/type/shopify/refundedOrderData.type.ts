import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../../enum/metric-type.enum';

@ObjectType()
export class MetricShopifyRefundedOrderLineItem {
  @Field(() => String)
  name: string;

  @Field(() => String)
  total_discount: string;
}

@ObjectType()
export class MetricShopifyRefundedOrderLineItems {
  @Field(() => MetricShopifyRefundedOrderLineItem)
  line_item: MetricShopifyRefundedOrderLineItem;
}

@ObjectType()
export class MetricShopifyRefundedOrder {
  @Field(() => MetricTypeEnum)
  type: MetricTypeEnum;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  calculatedSubtotal: number;

  @Field(() => Int)
  calculatedTotalWithTtax: number;

  @Field(() => [MetricShopifyRefundedOrderLineItems])
  refund_line_items: MetricShopifyRefundedOrderLineItems[];
}
