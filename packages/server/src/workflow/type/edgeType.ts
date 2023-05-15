import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Workflow Edge Type',
})
export class WorkflowEdge {
  @Field(() => ID)
  id: string;

  @Field()
  source: string;

  @Field()
  target: string;

  @Field()
  sourceHandle: string;
}
