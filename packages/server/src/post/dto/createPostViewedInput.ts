import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MetricUtmDataInput {
  @Field({ nullable: true })
  campaign?: string;

  @Field({ nullable: true })
  source?: string;

  @Field({ nullable: true })
  term?: string;

  @Field({ nullable: true })
  medium?: string;

  @Field({ nullable: true })
  content?: string;
}

@InputType({ description: 'create post input' })
export class CreatePostViewedInput {
  @Field(() => String)
  postHandle: string;

  @Field(() => String, { nullable: true })
  referer?: string;

  @Field(() => String, { nullable: true })
  ipAddress?: string;

  @Field(() => MetricUtmDataInput, { nullable: true })
  utmData?: MetricUtmDataInput;
}
