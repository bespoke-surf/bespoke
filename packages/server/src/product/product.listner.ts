import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductListener {
  // constructor(private readonly eventService: EventService) {}
  // @OnEvent(PRODUCT_CREATE_EVENT)
  // handleUserCreatedEvent(event: Product) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.PRODUCT,
  //     message: `Product ${event.name} created`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
  // @OnEvent(PRODUCT_DELETE_EVENT)
  // handleUserDeleteEvent(event: Product) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.PRODUCT,
  //     message: `Prod ct${event.name} deleted`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
}
