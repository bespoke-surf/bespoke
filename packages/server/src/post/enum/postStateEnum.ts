import { registerEnumType } from '@nestjs/graphql';

export enum PostStateEnum {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISH = 'UN_PUBLISHED',
}

registerEnumType(PostStateEnum, {
  name: 'PostState',
  description: 'Different post states',
});
