import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'generate file access url for user input' })
export class GenerateFileAccessUrlForUserInput {
  @Field()
  storeId: string;

  @Field()
  filePath: string;

  @Field()
  fileName: string;
}
