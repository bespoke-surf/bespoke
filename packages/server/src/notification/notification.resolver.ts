import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => Notification, {
    nullable: true,
    description: 'toggle send email notification',
  })
  newSubscriberNotificationToggle(
    @Args('subdomain') subdomain: string,
  ): Promise<Notification | null> {
    return this.notificationService.newSubscriberNotificationToggle(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Notification, {
    nullable: true,
    description: 'get notification',
  })
  getNotification(
    @Args('subdomain') subdomain: string,
  ): Promise<Notification | null> {
    return this.notificationService.getNotification(subdomain);
  }
}
