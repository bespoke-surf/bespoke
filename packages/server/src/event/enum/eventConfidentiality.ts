import { registerEnumType } from '@nestjs/graphql';

export enum EventAccessRestriction {
  HIGH = 'HIGH', // only the user can see the events
  MEDIUM = 'MEDIUM', // if user is a subscriber to a store. then the store owner can see these user events.
  LOW = 'LOW', // all events can be seen by everyone
}

registerEnumType(EventAccessRestriction, {
  name: 'EventConfidentiality',
  description: 'different types of confidential events for user',
});
