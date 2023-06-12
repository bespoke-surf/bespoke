import { registerEnumType } from '@nestjs/graphql';

export enum ApiAccessLevel {
  READ = 'read',
  CUSTOM = 'custom',
  FULL = 'full',
}

registerEnumType(ApiAccessLevel, {
  name: 'ApiAccessLevel',
  description: 'ApiAccessLevel',
});
