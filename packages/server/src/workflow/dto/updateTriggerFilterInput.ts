import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { DelayTypeEnum } from '../../enum/delaytype.enum';
import { BaseTriggerFilter } from '../type/baseTriggerFilter/baseTriggerFilter';
import { BaseTriggerFilterDateValue } from '../type/baseTriggerFilter/dateType';
import { BaseTriggerFilterDateValueExpressionEnum } from '../type/baseTriggerFilter/dateType/expression';
import { BaseTriggerFilterDimensionEnum } from '../type/baseTriggerFilter/enum/condition';
import { BaseTriggerFilterTypeEnum } from '../type/baseTriggerFilter/enum/type';
import { BaseTriggerFilterListValue } from '../type/baseTriggerFilter/listType';
import { BaseTriggerFilterListValueExpressionEnum } from '../type/baseTriggerFilter/listType/expression.enum';
import { BaseTriggerFilterNumberValueExpressionEnum } from '../type/baseTriggerFilter/numberType/expressionEnum';
import { BaseTriggerFilterNumberValue } from '../type/baseTriggerFilter/numberTypeValue';
import { BaseTriggerFilterTextValueExpressionEnum } from '../type/baseTriggerFilter/textType/expressionEnum';
import { BaseTriggerFilterTextValue } from '../type/baseTriggerFilter/textTypeValue';

@InputType()
export class BaseTriggerFilterDateValueInput
  implements BaseTriggerFilterDateValue
{
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

@InputType()
export class BaseTriggerFilterTextValueInput
  implements BaseTriggerFilterTextValue
{
  @Field(() => BaseTriggerFilterTextValueExpressionEnum, { nullable: true })
  textExpression?: BaseTriggerFilterTextValueExpressionEnum;

  @Field(() => String, { nullable: true })
  textValue?: string;
}

@InputType()
export class BaseTriggerFilterNumberValueInput
  implements BaseTriggerFilterNumberValue
{
  @Field(() => BaseTriggerFilterNumberValueExpressionEnum, { nullable: true })
  numberExpression?: BaseTriggerFilterNumberValueExpressionEnum;

  @Field(() => Int, { nullable: true })
  numberValue?: number;
}

@InputType()
export class BaseTriggerFilterBooleanValueInput {
  @Field(() => Boolean, { nullable: true })
  booleanValue?: boolean;
}

@InputType()
export class BaseTriggerFilterListValueInput
  implements BaseTriggerFilterListValue
{
  @Field(() => BaseTriggerFilterListValueExpressionEnum, { nullable: true })
  listExpression?: BaseTriggerFilterListValueExpressionEnum;

  @Field(() => String, { nullable: true })
  listValue?: string;
}

@InputType({ description: 'workflow state flow filter update input' })
export class WorkflowTriggerFilterInput implements BaseTriggerFilter {
  @Field(() => BaseTriggerFilterDimensionEnum, { nullable: true })
  dimension?: BaseTriggerFilterDimensionEnum;

  @Field(() => BaseTriggerFilterTypeEnum, { nullable: true })
  type?: BaseTriggerFilterTypeEnum;

  @Field(() => GraphQLJSONObject)
  value:
    | BaseTriggerFilterListValueInput
    | BaseTriggerFilterBooleanValueInput
    | BaseTriggerFilterDateValueInput
    | BaseTriggerFilterTextValueInput
    | BaseTriggerFilterNumberValueInput;
}

@InputType({ description: 'update flow filter input' })
export class UpdateTriggerFilterInput {
  @Field()
  workflowId: string;

  @Field(() => [[WorkflowTriggerFilterInput]], { nullable: true })
  triggerFilter: WorkflowTriggerFilterInput[][];
}
