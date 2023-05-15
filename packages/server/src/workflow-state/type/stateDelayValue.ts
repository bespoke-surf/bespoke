import { Field, ObjectType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../enum/delaytype.enum';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class WorkflowStateDelayActivityValue {
  @Field(() => DelayTypeEnum)
  delayType: DelayTypeEnum;

  @Field()
  delayInMilliseconds: number;
}
