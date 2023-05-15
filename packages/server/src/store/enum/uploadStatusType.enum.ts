import { registerEnumType } from '@nestjs/graphql';

export enum UploadLimitType {
  EXCEEDED = 'exceeded',
  REACHED = 'reached',
  OK = 'OK',
  ERROR = 'ERROR',
}

registerEnumType(UploadLimitType, {
  name: 'UploadLimitType',
  description: 'different types of subscription',
});
