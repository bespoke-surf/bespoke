import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { Post } from './post.entity';

export const POST_PUBLISH_EVENT = 'post_publish_event';
export const POST_UNPUBLISH_EVENT = 'post_unpublish_event';
export const POST_DELETE_EVENT = 'post_delete_event';

@Injectable()
export class PostListener {
  constructor(private readonly eventService: EventService) {}

  @OnEvent(POST_PUBLISH_EVENT)
  handleUserPublishEvent(event: Post) {
    console.log('publish event');
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.POST,
      message: `Post ${event.title} published`,
      userId: event.store.user.id,
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventState: EventState.COMPLETED,
      showAsNotification: true,
    });
  }

  @OnEvent(POST_UNPUBLISH_EVENT)
  handleUserUnPublishEvent(event: Post) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.POST,
      message: `Post ${event.title} un-published`,
      userId: event.store.user.id,
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventState: EventState.COMPLETED,
      showAsNotification: true,
    });
  }

  @OnEvent(POST_DELETE_EVENT)
  handleUserDeleteEvent(event: Post) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.POST,
      message: `Post ${event.title} deleted`,
      userId: event.store.user.id,
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventState: EventState.COMPLETED,
      showAsNotification: true,
    });
  }
}
