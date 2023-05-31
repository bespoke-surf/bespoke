import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs, { OpUnitType } from 'dayjs';
import { Redis } from 'ioredis';
import { Like, Repository } from 'typeorm';
import { UNSUBSCRIBE_ID_PREFIX } from '../constants';
import { MetricService } from '../metric/metirc.service';
import { Metric } from '../metric/metric.entity';
import { EmailConcentCollectedFrom } from '../subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from '../subscriber-list/enum/emailConcentOptInLevel.enum';
import { SubscriberList } from '../subscriber-list/subscriber-list.entity';
import { SubscriberListService } from '../subscriber-list/subscriber-list.service';
import { SubscriberEmailStatus } from './enum/emailStatus.enum';
import { Subscriber, SubscriberAddress } from './subscriber.entity';
import { SUBSCRIBER_ADD_SUBSCRIBER_EVENT } from './subscriber.listner';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
    private metricService: MetricService,
    private subscriberListService: SubscriberListService,
    @InjectRepository(SubscriberAddress)
    private subscriberAddressRepo: Repository<SubscriberAddress>,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private redis: Redis,
  ) {}

  async emitEvent(eventName: string, subscriberId: string) {
    const getPost = await this.subscriberRepo.findOne({
      where: { id: subscriberId },
      relations: {
        user: true,
      },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async getSubscriber(subscriberId: string): Promise<Subscriber | null> {
    const subscriber = await this.subscriberRepo.findOne({
      where: {
        id: subscriberId,
      },
      relations: {
        user: {
          userEmailDeliveryStatus: true,
        },
        subscriberAddress: true,
      },
    });
    return subscriber ?? null;
  }

  async getStoreSubscriber(
    storeId: string,
    userId: string,
  ): Promise<Subscriber | null> {
    const subscriber = await this.subscriberRepo.findOne({
      where: { storeId, userId },
    });
    return subscriber ?? null;
  }

  async updateSubscriberName(
    subscriberId: string,
    firstName?: string,
    lastName?: string,
  ): Promise<Subscriber | null> {
    if (firstName && firstName !== 'undefined') {
      await this.subscriberRepo.update(subscriberId, {
        firstName,
      });
    }
    if (lastName && lastName !== 'undefined') {
      await this.subscriberRepo.update(subscriberId, {
        lastName,
      });
    }

    const updatedSubscriber = await this.subscriberRepo.findOne({
      where: {
        id: subscriberId,
      },
    });

    return updatedSubscriber ?? null;
  }

  async createSubscriber(
    storeId: string,
    userId: string,
    firstName?: string,
    lastName?: string,
  ): Promise<Subscriber | null> {
    const subscriber = await this.subscriberRepo.save({
      storeId,
      userId,
    });

    if (firstName && firstName !== 'undefined') {
      await this.subscriberRepo.update(subscriber.id, {
        firstName,
      });
    }
    if (lastName && lastName !== 'undefined') {
      await this.subscriberRepo.update(subscriber.id, {
        lastName,
      });
    }

    this.emitEvent(SUBSCRIBER_ADD_SUBSCRIBER_EVENT, subscriber.id);
    return subscriber;
  }

  async getSubscribers(
    subdomain: string,
    skip: number,
    take: number,
  ): Promise<Subscriber[] | null> {
    const subscriber = await this.subscriberRepo.find({
      where: {
        store: {
          subdomain,
        },
      },
      relations: {
        user: true,
      },
      order: {
        user: {
          email: 'ASC',
        },
      },
      skip,
      take,
    });
    return subscriber ?? null;
  }
  async searchSubsribers(
    searchString: string,
    subdomain: string,
  ): Promise<Subscriber[] | null> {
    const subscriber = await this.subscriberRepo.find({
      relations: {
        user: true,
        store: true,
      },
      where: {
        store: {
          subdomain,
        },
        user: {
          email: Like(`%${searchString}%`),
        },
      },
      order: {
        user: {
          email: 'ASC',
        },
      },
    });
    return subscriber ?? null;
  }

  async getSubscribersCount(subdomain: string): Promise<number> {
    const count = await this.subscriberRepo.count({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return count;
  }

  async getSubscriberWithEmail(
    subdomain: string,
    email: string,
  ): Promise<Subscriber | null> {
    const subscriber = await this.subscriberRepo
      .createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.user', 'user')
      .leftJoinAndSelect('subscriber.store', 'store')
      .where('user.email = :email', { email })
      .andWhere('store.subdomain = :subdomain', { subdomain })
      .getOne();

    return subscriber ?? null;
  }

  async getStoreSubscribers(storeId: string): Promise<Subscriber[] | null> {
    const subs = await this.subscriberRepo.find({
      where: { storeId },
      relations: { user: true },
    });
    return subs ?? null;
  }

  async placedOrder(data: any, subdomain: string): Promise<Metric | null> {
    const placedOrderData = data;
    const email = placedOrderData['email'];

    if (!email) return null;

    const subscriber = await this.getSubscriberWithEmail(subdomain, email);

    if (!subscriber) return null;

    const metric = await this.metricService.createPlacedOrderMetric(
      data,
      subscriber.id,
      subscriber.storeId,
    );

    await this.metricService.createOrderedProductMetric(
      data,
      subscriber.id,
      subscriber.storeId,
    );

    return metric ?? null;
  }

  async orderRefund(
    data: any,
    subdomain: string,
    email: string,
  ): Promise<Metric | null> {
    const subscriber = await this.getSubscriberWithEmail(subdomain, email);
    if (!subscriber) return null;
    const metric = await this.metricService.createOrderRefundMetric(
      data,
      subscriber.id,
      subscriber.storeId,
    );

    return metric ?? null;
  }

  async fulfilledOrder(data: any, subdomain: string): Promise<Metric | null> {
    const fulfilledOrder = data;
    const email = fulfilledOrder['email'];

    const subscriber = await this.getSubscriberWithEmail(subdomain, email);

    if (!subscriber) return null;

    const metric = await this.metricService.createFulfilledOrderMetric(
      data,
      subscriber.id,
      subscriber.storeId,
    );
    return metric ?? null;
  }

  async cancelledOrder(data: any, subdomain: string): Promise<Metric | null> {
    const fulfilledOrder = data;
    const email = fulfilledOrder['email'];

    const subscriber = await this.getSubscriberWithEmail(subdomain, email);

    if (!subscriber) return null;

    const metric = await this.metricService.createCancelledOrderMetric(
      data,
      subscriber.id,
      subscriber.storeId,
    );
    return metric ?? null;
  }

  async getSubscriberCountDuringPeriod(
    subdomain: string,
    unit: OpUnitType,
  ): Promise<number> {
    const day = dayjs()
      .utc()
      .startOf(unit)
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const subscribers = await this.subscriberRepo
      .createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.store', 'store')
      .where('store.subdomain =:subdomain', { subdomain })
      .andWhere('subscriber.createdAt >= :date', { date: day })
      .getCount();

    return subscribers;
  }

  async updateSubscriberPhoneNumber(subscriberId: string, phoneNumber: string) {
    await this.subscriberRepo.update(subscriberId, {
      phoneNumber,
    });
  }

  async addOrUpdateSubscriberAddress({
    subscriber,
    address1,
    address2,
    city,
    country,
    state,
    zipCode,
  }: {
    subscriber: Subscriber;
    address1: string;
    address2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  }): Promise<SubscriberAddress | null> {
    try {
      const subscriberAddress = await this.subscriberAddressRepo.findOne({
        where: {
          subscriber: {
            id: subscriber.id,
          },
        },
      });

      if (subscriberAddress) {
        await this.subscriberAddressRepo.update(subscriberAddress.id, {
          address1,
          address2,
          city,
          country,
          state,
          zipCode,
        });
      } else {
        await this.subscriberAddressRepo.save({
          address1,
          address2,
          city,
          country,
          state,
          zipCode,
          subscriber,
        });
      }
      const updatedSubscriberAddress = await this.subscriberAddressRepo.findOne(
        {
          where: {
            id: subscriberAddress?.id,
          },
        },
      );
      return updatedSubscriberAddress;
    } catch (err) {
      return null;
    }
  }

  async redctSubscriberDetailsForShopify(
    subscriberId: string,
  ): Promise<boolean> {
    try {
      const subscriber = await this.subscriberRepo.findOne({
        where: {
          id: subscriberId,
        },
        relations: { subscriberAddress: true },
      });

      if (!subscriber) throw new Error();

      await this.subscriberRepo.update(subscriberId, {
        firstName: null,
        lastName: null,
        phoneNumber: null,
      });

      await this.subscriberAddressRepo.update(subscriber.subscriberAddress.id, {
        address1: null,
        address2: null,
        city: null,
        country: null,
        state: null,
        zipCode: null,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateSubscriberEmailStatus(
    subscriberId: string,
    emailStatus: SubscriberEmailStatus,
  ): Promise<null> {
    const subscriber = await this.subscriberRepo.findOne({
      where: {
        id: subscriberId,
      },
    });

    if (!subscriber) return null;

    await this.subscriberRepo.update(subscriberId, {
      emailStatus,
    });

    return null;
  }

  async addSubscriberToList(
    listId: string,
    subscriberId: string,
    collectedFrom: EmailConcentCollectedFrom,
    optInLevel: EmailConcentOptInLevel,
  ): Promise<SubscriberList | null> {
    const subscriber = await this.subscriberRepo.findOne({
      where: {
        id: subscriberId,
      },
    });

    if (!subscriber) return null;

    await this.updateSubscriberEmailStatus(
      subscriberId,
      SubscriberEmailStatus.SUBSCRIBED,
    );

    return await this.subscriberListService.addToList(
      listId,
      subscriberId,
      collectedFrom,
      optInLevel,
    );
  }

  async resubscribeToList(
    unsubscribeId: string,
    listId: string,
  ): Promise<null> {
    try {
      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
      );

      if (!data) return null;

      const { subscriberId } = JSON.parse(data);

      await this.addSubscriberToList(
        listId,
        subscriberId,
        EmailConcentCollectedFrom.LANDING_PAGE,
        EmailConcentOptInLevel.SINGLE_OPT_IN,
      );

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async unsubscribeFromAllList(unsubscribeId: string): Promise<null> {
    try {
      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
      );

      if (!data) return null;

      const { subscriberId } = JSON.parse(data);

      const subscriber = await this.subscriberRepo.findOne({
        where: {
          id: subscriberId,
        },
      });
      if (!subscriber) return null;

      await this.subscriberRepo.update(subscriberId, {
        emailStatus:
          subscriber.emailStatus === SubscriberEmailStatus.SUBSCRIBED
            ? SubscriberEmailStatus.UNSUBSCRIBED
            : SubscriberEmailStatus.SUBSCRIBED,
      });

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async unsubscrbe(unsubscribeId: string): Promise<null> {
    try {
      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${unsubscribeId}`,
      );
      if (!data) return null;

      const { subscriberId, listId } = JSON.parse(data);

      if (!subscriberId) return null;

      await this.subscriberRepo.update(subscriberId, {
        emailStatus: SubscriberEmailStatus.UNSUBSCRIBED,
      });

      if (listId) {
        await this.subscriberListService.unsubscrbeFromList(
          unsubscribeId,
          listId,
        );
      }

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
