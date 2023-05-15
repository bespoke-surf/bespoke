import { Field, ObjectType } from '@nestjs/graphql';
import { BaseConditionalFilterConditionEnum } from './enum/condition.enum';
import { BaseConditionalFilterValueUnion } from './flowFilterValueUnion';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilter {
  @Field(() => BaseConditionalFilterConditionEnum, { nullable: true })
  condition?: BaseConditionalFilterConditionEnum;

  @Field(() => BaseConditionalFilterValueUnion, { nullable: true })
  value?: typeof BaseConditionalFilterValueUnion;
}
