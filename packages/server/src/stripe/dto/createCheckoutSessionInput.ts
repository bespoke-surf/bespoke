import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'update shipping zone input' })
export class CreateCheckoutSessionInput {
  @Field(() => Int)
  contactQuantity: number;

  @Field()
  storeId: string;

  @Field()
  billingId: string;

  @Field()
  stripeCustomerId: string;

  @Field()
  subdomain: string;
}
