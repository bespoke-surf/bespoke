import { Field, InputType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../enum/delaytype.enum';
import { BaseConditionalFilter } from '../type/baseCoindtionalFilter/baseConditionalFilter';
import { BaseConditionalFilterConditionEnum } from '../type/baseCoindtionalFilter/enum/condition.enum';
import { BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum } from '../type/baseCoindtionalFilter/enum/hasDoneOrNotDoneTimeExpression.enum';
import { BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum } from '../type/baseCoindtionalFilter/enum/hasDoneOrNotDoneTrigger.enum';
import { BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum } from '../type/baseCoindtionalFilter/enum/hasDoneOrNotDoneValueInequalitExpression.enum';

@InputType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValueInequalityInput {
  @Field(
    () => BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
  )
  expression: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum;

  @Field({ nullable: true })
  value?: number;
}

@InputType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValueTimeInput {
  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum)
  expression: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum;

  @Field({ nullable: true })
  value1?: number;

  @Field({ nullable: true })
  value2?: number;

  @Field({ nullable: true })
  date1?: string;

  @Field({ nullable: true })
  date2?: string;

  @Field(() => DelayTypeEnum, {
    nullable: true,
  })
  delayType?: DelayTypeEnum;
}

@InputType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValueInput {
  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum)
  trigger: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum;

  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueInequalityInput)
  inequality: BaseConditionalFilterHasDoneOrNotDoneValueInequalityInput;

  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTimeInput)
  time: BaseConditionalFilterHasDoneOrNotDoneValueTimeInput;
}

@InputType({ description: 'workflow state flow filter update input' })
export class WorkflowFlowFilterInput implements BaseConditionalFilter {
  @Field(() => BaseConditionalFilterConditionEnum)
  condition: BaseConditionalFilterConditionEnum;

  @Field()
  value: BaseConditionalFilterHasDoneOrNotDoneValueInput;
}

@InputType({ description: 'update flow filter input' })
export class UpdateFlowFilterInput {
  @Field()
  workflowId: string;

  @Field(() => [[WorkflowFlowFilterInput]], { nullable: true })
  flowFilter?: WorkflowFlowFilterInput[][];
}
