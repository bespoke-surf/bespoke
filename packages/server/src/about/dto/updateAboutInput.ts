import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'update about input' })
export class UpdateAboutInput {
  @Field(() => String)
  about: string;

  @Field(() => String, { nullable: true })
  aboutLexical?: string;

  @Field(() => String, { nullable: true })
  aboutHTML?: string;

  @Field(() => String)
  aboutId: string;
}
