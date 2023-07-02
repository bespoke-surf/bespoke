import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GettingStartedResponse {
  @Field()
  type: 'product' | 'post' | 'automation' | 'form';

  @Field()
  completed: boolean;
}
