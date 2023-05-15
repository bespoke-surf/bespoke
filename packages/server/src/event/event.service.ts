import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SseService } from '../sse/sse.service';
import { EventAccessRestriction } from './enum/eventConfidentiality';
import { EventState } from './enum/eventState.enum';
import { EventType } from './enum/eventType.enum';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    private sseService: SseService,
  ) {}

  async unreadNotificationCount(userId: string): Promise<number> {
    const event = await this.eventRepo.find({
      where: {
        notificationRead: false,
        notificationDismissed: false,
        showAsNotification: true,
        userId,
      },
    });
    return event.length ?? 0;
  }

  async dismissEvent(eventId: string): Promise<null> {
    await this.eventRepo.update(eventId, {
      notificationDismissed: true,
    });
    return null;
  }

  async getNotifications(
    take: number,
    skip: number,
    userId: string,
  ): Promise<Event[] | null> {
    const event = await this.eventRepo.find({
      where: {
        showAsNotification: true,
        notificationDismissed: false,
        userId,
      },
      take,
      skip,
      order: {
        createdAt: 'desc',
      },
    });
    return event ?? null;
  }

  async setAllEventsAsRead(userId: string): Promise<null> {
    const events = await this.eventRepo.find({
      where: {
        notificationRead: false,
        showAsNotification: true,
        userId,
      },
    });

    if (!events) return null;

    for (const event of events) {
      await this.eventRepo.update(event.id, {
        notificationRead: true,
      });
    }

    return null;
  }

  async createEvent({
    eventAccessRestriction,
    eventType,
    message,
    userId,
    subdomain,
    eventState,
    eventProducerId,
    showAsNotification = false,
    link,
  }: {
    link?: string; // should start with  a forward slash "/"
    eventAccessRestriction: EventAccessRestriction;
    eventType: EventType;
    message: string;
    eventState: EventState;
    userId: string;
    eventProducerId: string;
    showAsNotification?: boolean;
    subdomain?: string;
  }): Promise<Event | null> {
    const event = await this.eventRepo.save({
      eventType,
      message,
      userId,
      eventState,
      eventProducerId,
      showAsNotification,
      eventAccessRestriction,
      link,
    });

    if (showAsNotification) {
      this.sseService.addEvent({
        data: { message, state: eventState },
        id: subdomain,
        type: eventType,
        retry: 1,
      });
    }

    return event ?? null;
  }
}

/*
+5 growth stars
level up 
daily challenges completed
weekly challenges completed
milestone challenges completed
stage completed
subscription rewards earned


weekly challenge and metric update 
milestone challenge metric and update
//email created:


*/
