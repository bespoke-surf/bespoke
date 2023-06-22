import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithList } from '../guard/hasStoreAccessWithList';
import { SubscriberList } from './subscriber-list.entity';
import { SubscriberListService } from './subscriber-list.service';

@Resolver()
export class SubscriberListResolver {
  constructor(private subscriberListService: SubscriberListService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithList)
  @Query(() => [SubscriberList], {
    nullable: true,
    description: 'check user onboarded',
  })
  getSubscriberLists(
    @Args('listId') listId: string,
    @Args('skip', { type: () => Int }) skip: number,
    @Args('take', { type: () => Int }) take: number,
  ): Promise<SubscriberList[] | null> {
    return this.subscriberListService.getSubscriberLists(listId, skip, take);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithList)
  @Query(() => Int, {
    nullable: true,
    description: 'check user onboarded',
  })
  getSubscribersInListCount(@Args('listId') listId: string): Promise<number> {
    return this.subscriberListService.getSubscribersInListCount(listId);
  }

  @Query(() => [SubscriberList], {
    nullable: true,
    description: 'get lists of a unsubscirber',
  })
  getAllListsOfASubscriber(
    @Args('unsubscriberId') unsubscriberId: string,
  ): Promise<SubscriberList[] | null> {
    return this.subscriberListService.getAllListsOfASubscriber(unsubscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithList)
  @Mutation(() => SubscriberList, {
    nullable: true,
    description: 'update multiple product images',
  })
  removeSubscriberFromList(
    @Args('listId') listId: string,
    @Args('subscriberId') subscriberId: string,
  ): Promise<SubscriberList | null> {
    return this.subscriberListService.removeSubscriberFromList(
      listId,
      subscriberId,
    );
  }

  @Mutation(() => SubscriberList, {
    nullable: true,
    description: 'unsubscribe from list',
  })
  async unsubscribeFromList(
    @Args('unsubscribeId') unsubscribeId: string,
    @Args('listId') listId: string,
  ): Promise<SubscriberList | null> {
    return this.subscriberListService.getSubscriberIdAndUnsubscribeFromList(
      unsubscribeId,
      listId,
    );
  }
}
