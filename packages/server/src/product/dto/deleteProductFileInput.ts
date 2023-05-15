import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'delete product files input' })
export class DeleteProductFileInput {
  @Field()
  productId: string;

  @Field(() => String)
  file: string;
}
