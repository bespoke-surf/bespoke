import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'update store details input' })
export class CreateShopifyAppSubscriptionInput {
  @Field(() => String)
  subdomain: string;

  // if its unsubscrbed initiall, this means add 25 levels
  @Field(() => Boolean)
  isPremium: boolean;

  @Field(() => Int)
  contactQuantity: number;
}
