import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class BaseTriggerFilterBooleanValue {
  @Field(() => Boolean, { nullable: true })
  booleanValue?: boolean;
}
