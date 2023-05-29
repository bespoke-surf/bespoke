import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsISO31661Alpha2, IsString } from 'class-validator';
import { Store } from '../store.entity';

@InputType({ description: 'update store details input' })
export class UpdateStoreDetailsInput implements Partial<Store> {
  @Field(() => String)
  storeId: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  storeAbout?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  subdomain?: string;

  @Field()
  @IsString()
  senderName: string;

  @Field()
  @IsEmail()
  senderEmail: string;

  @Field()
  @IsString()
  address1: string;

  @Field({ nullable: true })
  @IsString()
  address2?: string;

  @Field()
  @IsISO31661Alpha2()
  country: string;

  @Field()
  @IsString()
  city: string;

  @Field({ nullable: true })
  @IsString()
  state?: string;

  @Field()
  zipCode: string;
}
