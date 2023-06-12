import { registerEnumType } from '@nestjs/graphql';

export enum ApiKeyAccessScopeEnum {
  LIST_READ = 'list:read',
  LIST_MANAGE = 'list:manage',
  SUBSCRIBER_READ = 'subscriber:read',
  SUBSCRIBER_MANAGE = 'subscriber:manage',
}

registerEnumType(ApiKeyAccessScopeEnum, {
  name: 'ApiKeyAccessScopeEnum',
  description: 'Diffrent api key access scope enums',
});
