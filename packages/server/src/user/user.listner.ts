import { Injectable } from '@nestjs/common';

export const USER_LOGIN = 'user_login';
export const USER_SIGNUP = 'user_signup';
// export const USER_LOST_SUBSCRIBER_EVENT = 'user_lost_subscriber_event';

@Injectable()
export class UserListener {
  // constructor(private readonly eventService: EventService) {}
  // @OnEvent(USER_LOST_SUBSCRIBER_EVENT)
  // handleUserSignupEvent(event: User) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.USER,
  //     message: 'You lost a potential subscriber.',
  //     userId: event.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //     showAsNotification: true,
  //     subdomain: event.store.subdomain,
  //   });
  // }
  // @OnEvent(USER_SIGNUP)
  // handleUserSignupEvent(event: User) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.USER,
  //     message: 'Bespoke user signed up',
  //     userId: event.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
  // @OnEvent(USER_LOGIN)
  // handleUserLoginEvent(event: User) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.USER,
  //     message: `User loged in`,
  //     userId: event.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
}
