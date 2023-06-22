import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
import { UNSUBSCRIBE_ID_PREFIX } from '../constants';
import { MetricService } from '../metric/metirc.service';
import { EmailConcentCollectedFrom } from './enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from './enum/emailConcentOptInLevel.enum';
import { EmailConcentState } from './enum/emailConcentState.enum';
import { EmailConcent, SubscriberList } from './subscriber-list.entity';
import {
  SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT,
  SUBSCRIBER_LIST_REMOVE_SUBSCRIBER_FROM_LIST_EVENT,
  SUBSCRIBER_LIST_UNSUBSCRIBED_FROM__LIST_EVENT,
} from './subscriber-list.listner';

@Injectable()
export class SubscriberListService {
  constructor(
    @InjectRepository(SubscriberList)
    private readonly subscriberListRepo: Repository<SubscriberList>,
    @InjectRepository(EmailConcent)
    private readonly emailConcentRepo: Repository<EmailConcent>,
    private eventEmitter: EventEmitter2,
    private metricService: MetricService,
    @InjectRedis() private redis: Redis,
  ) {}

  async emitEvent(
    eventName: string,
    listId: string,
    subscriberId: string,
  ): Promise<void> {
    const subListWithRelation = await this.subscriberListRepo.findOne({
      where: {
        listId,
        subscriberId,
      },
      relations: {
        list: true,
        subscriber: true,
      },
    });

    this.eventEmitter.emit(eventName, subListWithRelation);
  }

  async getSubscribersInListCount(listId: string): Promise<number> {
    const count = await this.subscriberListRepo.count({
      where: {
        listId: listId,
      },
    });
    return count;
  }

  async getSubscriberList(
    subscriberId: string,
    listId: string,
  ): Promise<SubscriberList | null> {
    const subscirberList = await this.subscriberListRepo.findOne({
      where: {
        listId,
        subscriberId,
      },
      relations: {
        subscriber: {
          user: {
            userEmailDeliveryStatus: true,
          },
        },
        emailConcent: true,
      },
    });
    return subscirberList;
  }

  async getSubscriberLists(
    listId: string,
    skip: number,
    take: number,
  ): Promise<SubscriberList[] | null> {
    const subscriberList = await this.subscriberListRepo
      .createQueryBuilder('subscriberList')
      .where('subscriberList.listId =:listId', { listId })
      .leftJoinAndSelect('subscriberList.emailConcent', 'emailConcent')
      .leftJoinAndSelect('subscriberList.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.user', 'user')
      .orderBy('subscriberList.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    return subscriberList ?? null;
  }
  async getSubscriberListsToSendEmail(
    listId: string,
  ): Promise<SubscriberList[] | null> {
    const subscriberList = await this.subscriberListRepo
      .createQueryBuilder('subscriberList')
      .where('subscriberList.listId =:listId', { listId })
      .leftJoinAndSelect('subscriberList.emailConcent', 'emailConcent')
      .leftJoinAndSelect('subscriberList.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.user', 'user')
      .leftJoinAndSelect(
        'user.userEmailDeliveryStatus',
        'userEmailDeliveryStatus',
      )
      .orderBy('subscriberList.createdAt', 'DESC')
      .getMany();

    return subscriberList ?? null;
  }

  async getAllListsOfASubscriber(
    unsubscribeId: string,
  ): Promise<SubscriberList[] | null> {
    const data = await this.redis.get(
      `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
    );
    if (!data) return null;
    const { subscriberId } = JSON.parse(data);

    const subscriberList = await this.subscriberListRepo
      .createQueryBuilder('subscriberList')
      .where('subscriberList.subscriberId =:subscriberId', { subscriberId })
      .leftJoinAndSelect('subscriberList.emailConcent', 'emailConcent')
      .leftJoinAndSelect('subscriberList.list', 'list')
      .leftJoinAndSelect('subscriberList.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.user', 'user')
      .orderBy('subscriberList.createdAt', 'DESC')
      .getMany();

    return subscriberList ?? null;
  }

  async removeSubscriberFromList(
    listId: string,
    subscriberId: string,
  ): Promise<SubscriberList | null> {
    try {
      const subList = await this.subscriberListRepo.findOne({
        where: {
          listId,
          subscriberId,
        },
        relations: {
          list: true,
          subscriber: true,
        },
      });
      if (!subList) return null;
      this.emitEvent(
        SUBSCRIBER_LIST_REMOVE_SUBSCRIBER_FROM_LIST_EVENT,
        listId,
        subscriberId,
      );
      await this.subscriberListRepo.remove(subList);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addOrSubscribeToList(
    listId: string,
    subscriberId: string,
    collectedFrom: EmailConcentCollectedFrom,
    optInLevel: EmailConcentOptInLevel,
  ): Promise<SubscriberList | null> {
    const checkIfAlreadyAdded = await this.subscriberListRepo.findOne({
      where: {
        listId,
        subscriberId,
      },
      relations: {
        list: true,
        subscriber: true,
        emailConcent: true,
      },
    });

    // checking also safe gurds from triggering workflow after a subscriber is added

    if (
      checkIfAlreadyAdded &&
      checkIfAlreadyAdded.emailConcent.state === EmailConcentState.SUBSCRIBED
    ) {
      return null;
    }

    if (
      checkIfAlreadyAdded?.emailConcent.state === EmailConcentState.UNSUBSCRIBED
    ) {
      await this.emailConcentRepo.update(checkIfAlreadyAdded.emailConcent.id, {
        state: EmailConcentState.SUBSCRIBED,
      });
      return null;
    }

    const subscriberList = await this.subscriberListRepo.save({
      listId,
      subscriberId,
    });

    await this.emailConcentRepo.save({
      collectedFrom,
      optInLevel,
      state: EmailConcentState.SUBSCRIBED,
      subscriberList,
    });

    // await this.workflowService.triggerListWorkflow(listId);

    this.emitEvent(
      SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT,
      listId,
      subscriberId,
    );

    return subscriberList;
  }

  async unsubscrbeFromList(
    subscriberId: string,
    listId: string,
  ): Promise<null> {
    try {
      const subsriberList = await this.subscriberListRepo.findOne({
        where: {
          listId,
          subscriberId,
        },
        relations: {
          emailConcent: true,
          subscriber: true,
        },
      });

      if (!subsriberList) return null;

      await this.emailConcentRepo.update(subsriberList?.emailConcent.id, {
        state: EmailConcentState.UNSUBSCRIBED,
      });

      await this.metricService.createEmailUnsubscribed({
        subscriberId,
        listId,
        storeId: subsriberList.subscriber.storeId,
      });

      this.emitEvent(
        SUBSCRIBER_LIST_UNSUBSCRIBED_FROM__LIST_EVENT,
        listId,
        subscriberId,
      );

      return null;
    } catch (err) {
      console.log('here');
      console.log(err);
      return null;
    }
  }

  async getSubscribersAddedToListByDayOrWeek(
    listId: string,
    mode: 'day' | 'week',
  ): Promise<number> {
    const day = dayjs()
      .utc()
      .startOf(mode)
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const subscribers = await this.subscriberListRepo
      .createQueryBuilder('subscriberList')
      .where('subscriberList.listId =:listId', { listId })
      .andWhere('subscriberList.createdAt >= :date', { date: day })
      .getCount();
    return subscribers;
  }

  async getSubscriberIdAndUnsubscribeFromList(
    unsubscribeId: string,
    listId: string,
  ): Promise<null> {
    try {
      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
      );
      if (!data) return null;

      const { subscriberId } = JSON.parse(data);

      if (!subscriberId) return null;

      if (listId) {
        await this.unsubscrbeFromList(subscriberId, listId);
      }

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async unsubscribe(unsubscribeId: string): Promise<null> {
    try {
      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
      );
      if (!data) return null;

      const { subscriberId, listId } = JSON.parse(data);

      if (!subscriberId) return null;

      if (listId) {
        await this.unsubscrbeFromList(subscriberId, listId);
      }

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
