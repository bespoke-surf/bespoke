import { Injectable } from '@nestjs/common';
import S3 from 'aws-sdk/clients/s3';
import { GenerateFileAccessUrlForUserInput } from './dto/generateFileAcessUrlForUserInput';

@Injectable()
export class S3Service {
  getS3() {
    return new S3({
      region: process.env.S3_BUCKET_REGION,
      accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    });
  }

  async generateFileAccessUrlForUser(
    input: GenerateFileAccessUrlForUserInput,
  ): Promise<string | null> {
    try {
      const parameters = {
        Bucket: `${process.env.S3_BUCKET_NAME}/${input.filePath}`,
        Key: input.fileName,
        Expires: 60 * 60 * 24,
      };

      const s3 = this.getS3();

      const url = s3.getSignedUrl('getObject', parameters);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
