import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Workflow state delay activity vlaue',
})
export class WorkflowStateSendEmailActivityValue {
  @Field()
  type: 'simple' | 'complex';

  @Field()
  html: string;

  @Field()
  design: string;
}
