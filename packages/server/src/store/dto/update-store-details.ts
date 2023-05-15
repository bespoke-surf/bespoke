import { Field, InputType } from '@nestjs/graphql';
import { Store } from '../store.entity';

@InputType({ description: 'update store details input' })
export class UpdateStoreDetailsInput implements Partial<Store> {
  @Field(() => String)
  storeId: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  storeAbout?: string;

  @Field(() => String, { nullable: true })
  subdomain?: string;

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
