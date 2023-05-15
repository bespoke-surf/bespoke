import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { SubscriberList } from './subscriber-list.entity';

export const SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT =
  'subscriberList_addSubscriberToList_event';

export const SUBSCRIBER_LIST_REMOVE_SUBSCRIBER_FROM_LIST_EVENT =
  'subscriberList_remove_subscriber_from_list_event';

export const SUBSCRIBER_LIST_UNSUBSCRIBED_FROM__LIST_EVENT =
  'subscriberList_unsubscribed_from_list_event';

@Injectable()
export class SubscriberListListener {
  constructor(
    private readonly eventService: EventService,
    @InjectSentry() private sentryService: SentryService,
  ) {}

  @OnEvent(SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT)
  handleUserCreatedEvent(event: SubscriberList) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.SUBSCRIBER_LIST,
      message: `Added to list ${event.list.name}`,
      userId: event.subscriber.userId,
      eventAccessRestriction: EventAccessRestriction.MEDIUM,
      eventState: EventState.COMPLETED,
    });
  }
  @OnEvent(SUBSCRIBER_LIST_REMOVE_SUBSCRIBER_FROM_LIST_EVENT)
  handleSubscriberRemoved(event: SubscriberList) {
    try {
      if (!event.id) throw new Error(JSON.stringify(event));
      this.eventService.createEvent({
        eventProducerId: event.id,
        eventType: EventType.SUBSCRIBER_LIST,
        message: `Removed from list ${event.list.name}`,
        userId: event.subscriber.userId,
        eventAccessRestriction: EventAccessRestriction.MEDIUM,
        eventState: EventState.COMPLETED,
      });
    } catch (err) {
      this.sentryService.instance().captureException(err);
    }
  }

  @OnEvent(SUBSCRIBER_LIST_UNSUBSCRIBED_FROM__LIST_EVENT)
  handleUnsubscribedFromListEvent(event: SubscriberList) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.SUBSCRIBER_LIST,
      message: `Unsubscribed from list ${event.list.name}`,
      userId: event.subscriber.userId,
      eventAccessRestriction: EventAccessRestriction.MEDIUM,
      eventState: EventState.COMPLETED,
    });
  }
}
