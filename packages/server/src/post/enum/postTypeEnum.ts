import { registerEnumType } from '@nestjs/graphql';

export enum PostTypeEnum {
  POST = 'POST',
  AUTOMATION = 'AUTOMATION',
}

registerEnumType(PostTypeEnum, {
  name: 'PostType',
  description: 'Different post states',
});
