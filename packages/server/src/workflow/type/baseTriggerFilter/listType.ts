import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTriggerFilterListValueExpressionEnum } from './listType/expression.enum';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilterListValue {
  @Field(() => BaseTriggerFilterListValueExpressionEnum, { nullable: true })
  listExpression?: BaseTriggerFilterListValueExpressionEnum;

  @Field(() => String, { nullable: true })
  listValue?: string;
}
