import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../store/store.entity';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async newSubscriberNotificationToggle(subdomain: string): Promise<null> {
    const notification = await this.notificationRepo.findOne({
      where: {
        store: {
          subdomain,
        },
      },
    });

    if (!notification) return null;

    await this.notificationRepo.update(notification?.id, {
      newSubscriber: !notification?.newSubscriber,
    });

    return null;
  }

  async getNotification(subdomain: string): Promise<Notification | null> {
    const notification = await this.notificationRepo.findOne({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return notification ?? null;
  }

  async createNotificationRelation(store: Store): Promise<Notification | null> {
    const notification = await this.notificationRepo.save({
      store,
    });
    return notification ?? null;
  }
}
