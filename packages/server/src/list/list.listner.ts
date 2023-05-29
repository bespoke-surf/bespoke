import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { List } from './list.entity';

export const LIST_DELETE_EVENT = 'list-delete-event';

@Injectable()
export class ListListener {
  constructor(private readonly eventService: EventService) {}

  @OnEvent(LIST_DELETE_EVENT)
  handleUserDeleteEvent(event: List) {
    this.eventService.createEvent({
      eventProducerId: event.id,
      eventType: EventType.INTEGRATION,
      message: `List ${event.name} deleted`,
      userId: event.store.user.id,
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventState: EventState.COMPLETED,
      showAsNotification: true,
    });
  }
}
