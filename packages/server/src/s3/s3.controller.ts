import { Body, Controller, Post } from '@nestjs/common';
import { FileInfo } from './dto/fileInfo';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  private readonly s3Service: S3Service;

  @Post('sign-file')
  async signS3Private(@Body() data: { folder: string; fileInfo: FileInfo }) {
    try {
      const parameters = {
        Bucket: `${process.env.S3_BUCKET_NAME}/${data.folder}`,
        Key: data.fileInfo.name,
        Expires: 60,
        ContentType: data.fileInfo.type,
        ACL: 'private',
      };

      const s3 = this.s3Service.getS3();
      const url = await s3.getSignedUrlPromise('putObject', parameters);

      const s3Payload: {
        signedUrl: string;
        fileType: string;
        originalName: string;
      } = {
        signedUrl: url,
        fileType: data.fileInfo.type,
        originalName: data.fileInfo.originalName,
      };

      return s3Payload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
