import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupFormListener {
  // constructor(private readonly eventService: EventService) {}
  // @OnEvent(SIGNUP_FORM_ADD_EVENT)
  // handleUserCreatedEvent(event: SignupForm) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.SIGNUP_FORM,
  //     message: `Signup form ${event.name} added`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
  // @OnEvent(SIGNUP_FORM_DELTE_EVENT)
  // handleUserDeleteEvent(event: SignupForm) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.SIGNUP_FORM,
  //     message: `Signup form ${event.name} deleted`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
}
