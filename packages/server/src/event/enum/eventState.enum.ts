import { registerEnumType } from '@nestjs/graphql';

export enum EventState {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

registerEnumType(EventState, {
  name: 'EventState',
  description: 'different types of event',
});
