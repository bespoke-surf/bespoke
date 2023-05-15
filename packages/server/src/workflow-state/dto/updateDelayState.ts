import { Field, InputType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../enum/delaytype.enum';
import { WorkflowStateDelayActivityValue } from '../type/stateDelayValue';

@InputType({ description: 'update delay sate input' })
export class UpdateDelayStateInput
  implements Partial<WorkflowStateDelayActivityValue>
{
  @Field(() => DelayTypeEnum)
  delayType: DelayTypeEnum;

  @Field()
  delayInMilliseconds?: number;

  @Field(() => String)
  workflowStateId: string;
}
