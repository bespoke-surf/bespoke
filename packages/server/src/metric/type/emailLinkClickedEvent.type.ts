import { Field, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../enum/metric-type.enum';

@ObjectType()
export class MetricEmailLinkClicked {
  @Field(() => MetricTypeEnum)
  type: MetricTypeEnum;

  @Field()
  link: string;
}
