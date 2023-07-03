import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserId } from '../decorator/currentUserId';
import { AuthGuard } from '../guard/authGuard';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Query(() => Int, {
    description: 'has unread events',
  })
  unReadNotificationCount(@CurrentUserId() userId: string): Promise<number> {
    return this.eventService.unreadNotificationCount(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Event], {
    description: 'get notifications',
  })
  getNotifications(
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
    @CurrentUserId() userId: string,
  ): Promise<Event[] | null> {
    return this.eventService.getNotifications(take, skip, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Event, {
    nullable: true,
    description: 'dismiss an event',
  })
  dismissNotification(@Args('eventId') eventId: string): Promise<null> {
    return this.eventService.dismissEvent(eventId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Event, {
    nullable: true,
    description: 'set all events as read',
  })
  setAllEventAsRead(@CurrentUserId() userId: string): Promise<null> {
    return this.eventService.setAllEventsAsRead(userId);
  }
}
