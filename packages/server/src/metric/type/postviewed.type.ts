import { Field, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../enum/metric-type.enum';

@ObjectType()
export class MetricUtmDataType {
  @Field({ nullable: true })
  campaign?: string;

  @Field({ nullable: true })
  source?: string;

  @Field({ nullable: true })
  term?: string;

  @Field({ nullable: true })
  medium?: string;

  @Field({ nullable: true })
  content?: string;
}

@ObjectType()
export class MetricPostViewed {
  @Field(() => MetricTypeEnum)
  type: MetricTypeEnum;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  referer?: string;

  @Field(() => MetricUtmDataType, { nullable: true })
  utm?: MetricUtmDataType;
}
