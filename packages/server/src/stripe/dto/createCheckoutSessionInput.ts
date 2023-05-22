import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'update shipping zone input' })
export class CreateCheckoutSessionInput {
  @Field()
  storeId: string;

  @Field()
  billingId: string;

  @Field()
  stripeCustomerId: string;

  @Field()
  stripePriceId: string;

  @Field()
  subdomain: string;
}
