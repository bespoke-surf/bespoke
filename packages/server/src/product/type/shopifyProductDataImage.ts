import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({})
export class ShopifyProductDataImage {
  @Field(() => String, { nullable: true })
  id?: string | null | undefined;

  @Field(() => String, { nullable: true })
  altText?: string | null | undefined;

  @Field(() => Int, { nullable: true })
  height?: number | null | undefined;

  @Field(() => Int, { nullable: true })
  width?: number | null | undefined;

  @Field(() => Int)
  url: number;
}
