import { Field, ObjectType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';

@ObjectType({
  description: 'Workflow staet metric trigger value',
})
export class WorkflowStateMetricTriggerActivityValue {
  @Field(() => MetricTypeEnum)
  metricType: MetricTypeEnum;
}
