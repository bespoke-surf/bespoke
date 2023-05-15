import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTriggerFilterDimensionEnum } from './enum/condition';
import { BaseTriggerFilterTypeEnum } from './enum/type';
import { BaseTriggerFilterValueUnion } from './triggerFilterValueUnion';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilter {
  @Field(() => BaseTriggerFilterDimensionEnum, { nullable: true })
  dimension?: BaseTriggerFilterDimensionEnum;

  @Field(() => BaseTriggerFilterTypeEnum, { nullable: true })
  type?: BaseTriggerFilterTypeEnum;

  @Field(() => BaseTriggerFilterValueUnion, { nullable: true })
  value?: typeof BaseTriggerFilterValueUnion;
}
