import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTriggerFilterNumberValueExpressionEnum } from './numberType/expressionEnum';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilterNumberValue {
  @Field(() => BaseTriggerFilterNumberValueExpressionEnum, { nullable: true })
  numberExpression?: BaseTriggerFilterNumberValueExpressionEnum;

  @Field(() => Int, { nullable: true })
  numberValue?: number;
}
