import { Field, ObjectType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../../enum/delaytype.enum';
import { BaseTriggerFilterDateValueExpressionEnum } from './dateType/expression';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilterDateValue {
  @Field(() => BaseTriggerFilterDateValueExpressionEnum, { nullable: true })
  dateExpression?: BaseTriggerFilterDateValueExpressionEnum;

  @Field({ nullable: true })
  dateValue1?: number;

  @Field({ nullable: true })
  dateValue2?: number;

  @Field({ nullable: true })
  dateDate1?: string;

  @Field({ nullable: true })
  dateDate2?: string;

  @Field(() => DelayTypeEnum, {
    nullable: true,
  })
  dateDelayType?: DelayTypeEnum;
}
