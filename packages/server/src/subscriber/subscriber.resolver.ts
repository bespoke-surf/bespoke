import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { HasStoreAccessWithSubscriber } from '../guard/hasStoreAccessWithSubscriber';
import { Subscriber } from './subscriber.entity';
import { SubscriberService } from './subscriber.service';

@Resolver()
export class SubscriberResolver {
  constructor(private subscriberService: SubscriberService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Subscriber, {
    nullable: true,
    description: 'get subscriber',
  })
  getSubscriber(
    @Args('subscriberId') subscriberId: string,
  ): Promise<Subscriber | null> {
    return this.subscriberService.getSubscriber(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get subscribers list count',
  })
  getSubscribersCount(@Args('subdomain') subdomain: string): Promise<number> {
    return this.subscriberService.getSubscribersCount(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [Subscriber], {
    nullable: true,
    description: 'search subscribers by email for now',
  })
  searchSubscribers(
    @Args('searchString') searchString: string,
    @Args('subdomain') subdomain: string,
  ): Promise<Subscriber[] | null> {
    return this.subscriberService.searchSubsribers(searchString, subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [Subscriber], {
    nullable: true,
    description: 'get subscribers',
  })
  getSubscribers(
    @Args('subdomain') subdomain: string,
    @Args('skip', { type: () => Int }) skip: number,
    @Args('take', { type: () => Int }) take: number,
  ): Promise<Subscriber[] | null> {
    return this.subscriberService.getSubscribers(subdomain, skip, take);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get subscribers',
  })
  getSubscriberCountAddedToday(
    @Args('subdomain') subdomain: string,
  ): Promise<number> {
    return this.subscriberService.getSubscriberCountDuringPeriod(
      subdomain,
      'day',
    );
  }

  @Mutation(() => Subscriber, {
    nullable: true,
    description: 'resubscribe to list',
  })
  resubscribeToList(
    @Args('unsubscribeId') subscriberId: string,
    @Args('listId') listId: string,
  ): Promise<Subscriber | null> {
    return this.subscriberService.resubscribeToList(subscriberId, listId);
  }

  @Mutation(() => Subscriber, {
    nullable: true,
    description: 'unsubscribe from all list',
  })
  unsubscribeFromAllList(
    @Args('unsubscribeId') unsubscribeId: string,
  ): Promise<null> {
    return this.subscriberService.unsubscribeFromAllList(unsubscribeId);
  }
}
