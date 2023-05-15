import { Field, ObjectType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../../enum/delaytype.enum';
import { BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum } from './enum/hasDoneOrNotDoneTimeExpression.enum';
import { BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum } from './enum/hasDoneOrNotDoneTrigger.enum';
import { BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum } from './enum/hasDoneOrNotDoneValueInequalitExpression.enum';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValueInequality {
  @Field(
    () => BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum,
    { nullable: true },
  )
  expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum;

  @Field({ nullable: true })
  value?: number;
}

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValueTime {
  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum, {
    nullable: true,
  })
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

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseConditionalFilterHasDoneOrNotDoneValue {
  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum, {
    nullable: true,
  })
  trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum;

  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueInequality, {
    nullable: true,
  })
  inequality?: BaseConditionalFilterHasDoneOrNotDoneValueInequality;

  @Field(() => BaseConditionalFilterHasDoneOrNotDoneValueTime, {
    nullable: true,
  })
  time?: BaseConditionalFilterHasDoneOrNotDoneValueTime;
}
