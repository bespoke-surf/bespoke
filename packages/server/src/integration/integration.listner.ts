import { Injectable } from '@nestjs/common';

// export const INTEGRATION_CREATE_EVENT = 'integration_create_event';

@Injectable()
export class IntegrationListner {
  // constructor(private readonly eventService: EventService) {}
  // @OnEvent(INTEGRATION_CREATE_EVENT)
  // handleUserCreatedEvent(event: Integration) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.INTEGRATION,
  //     message: 'Integration crated',
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
}
