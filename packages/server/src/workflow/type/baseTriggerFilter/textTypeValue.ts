import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTriggerFilterTextValueExpressionEnum } from './textType/expressionEnum';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilterTextValue {
  @Field(() => BaseTriggerFilterTextValueExpressionEnum, { nullable: true })
  textExpression?: BaseTriggerFilterTextValueExpressionEnum;

  @Field(() => String, { nullable: true })
  textValue?: string;
}
