import { Field, InputType } from '@nestjs/graphql';
import { DelayTypeEnum } from '../../enum/delaytype.enum';

@InputType({ description: 'create new connection' })
export class CreateNewDelayNodeInput {
  @Field()
  delayInMilliseconds: number;

  @Field()
  delayType: DelayTypeEnum;

  @Field()
  workflowId: string;

  @Field()
  workflowStateId: string;

  @Field(() => Boolean)
  otherWise?: boolean;
}
