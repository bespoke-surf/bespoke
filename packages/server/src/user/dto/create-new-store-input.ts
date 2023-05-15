import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'update store details input' })
export class CompleteOnboardingInput {
  @Field(() => String)
  subdomain: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  about: string;

  @Field()
  senderName: string;

  @Field()
  senderEmail: string;

  @Field()
  address1: string;

  @Field({ nullable: true })
  address2?: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  state?: string;

  @Field()
  zipCode: string;
}
