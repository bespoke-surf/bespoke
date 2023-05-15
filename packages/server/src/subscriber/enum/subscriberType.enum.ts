import { registerEnumType } from '@nestjs/graphql';

export enum SubscriberTypeEnum {
  AUTHOR = 'Author',
  FREE = 'Free',
}

registerEnumType(SubscriberTypeEnum, {
  name: 'SubscriberType',
  description: 'different types of subscribers',
});
