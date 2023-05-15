import { Field, InputType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../enum/delaytype.enum';
import { WorkflowStateDelayActivityValue } from '../type/stateDelayValue';

@InputType({ description: 'update store details input' })
export class CreateDelayStateInput
  implements Partial<WorkflowStateDelayActivityValue>
{
  @Field(() => DelayTypeEnum)
  delayType: DelayTypeEnum;

  @Field()
  delayInMilliseconds?: number;

  @Field(() => String)
  workflowId: string;

  @Field(() => String)
  workflowStateId: string;

  @Field(() => Boolean, { nullable: true })
  otherWise?: boolean;
}
