import { Module } from '@nestjs/common';
import { S3Resolver } from './s3.resolver';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service, S3Resolver],
  exports: [S3Service],
})
export class S3Module {}
