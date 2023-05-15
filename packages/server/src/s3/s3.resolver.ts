import { Args, Resolver } from '@nestjs/graphql';
import { GenerateFileAccessUrlForUserInput } from './dto/generateFileAcessUrlForUserInput';
import { S3Service } from './s3.service';

@Resolver()
export class S3Resolver {
  private readonly s3Service: S3Service;

  async generateFileAccessUrlForUser(
    @Args('input') input: GenerateFileAccessUrlForUserInput,
  ): Promise<string | null> {
    return this.s3Service.generateFileAccessUrlForUser(input);
  }
}
