import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { Subscriber } from './subscriber.entity';

export const SUBSCRIBER_ADD_SUBSCRIBER_EVENT =
  'subscriber_add_subscriber_event';

@Injectable()
export class SubscriberListener {
  constructor(private readonly eventService: EventService) {}

  @OnEvent(SUBSCRIBER_ADD_SUBSCRIBER_EVENT)
  handleUserCreatedEvent(event: Subscriber) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.SUBSCRIBER,
      message: `Subscriber added`,
      userId: event.userId,
      eventAccessRestriction: EventAccessRestriction.MEDIUM,
      eventState: EventState.COMPLETED,
    });
  }
}
