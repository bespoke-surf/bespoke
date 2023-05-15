import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductFileInput {
  @Field()
  src: string;

  @Field()
  fileName: string;

  @Field()
  originalFileName: string;

  @Field()
  filePath: string;
}
