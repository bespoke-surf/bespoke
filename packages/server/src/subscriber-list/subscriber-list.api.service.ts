import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Equal, Repository } from 'typeorm';
import { AddSubscriberToListDto } from '../subscriber/dto/addSubscriberToList';
import {
  SubscriberList,
  subscriberListRelation,
  subscriberListSelct,
} from './subscriber-list.entity';
import { SubscriberListService } from './subscriber-list.service';

@Injectable()
export class SubscriberListApiService {
  constructor(
    @InjectRepository(SubscriberList)
    private subscriberListRepo: Repository<SubscriberList>,
    private subscriberListService: SubscriberListService,
  ) {}

  async getListSubscribers({
    id,
    take = 100,
    offset = 0,
  }: {
    id: string;
    take: number;
    offset: number;
  }): Promise<SubscriberList[]> {
    const subscribersList = await this.subscriberListRepo.find({
      where: {
        listId: Equal(id),
      },
      take,
      skip: offset,
      relations: subscriberListRelation,
      select: subscriberListSelct,
    });
    return subscribersList;
  }

  async getSubscriberLists({
    id,
    take = 100,
    offset = 0,
  }: {
    id: string;
    take: number;
    offset: number;
  }): Promise<SubscriberList[]> {
    const subscribersList = await this.subscriberListRepo.find({
      where: {
        subscriberId: Equal(id),
      },
      take,
      skip: offset,
      relations: subscriberListRelation,
      select: subscriberListSelct,
    });
    return subscribersList;
  }

  async getListSubscribersCount(listId: string): Promise<number> {
    return await this.subscriberListRepo.count({
      where: {
        listId: Equal(listId),
      },
    });
  }
  async getSubscriberList(
    listId: string,
    subscriberId: string,
  ): Promise<SubscriberList> {
    return await this.subscriberListRepo.findOneOrFail({
      where: {
        listId: Equal(listId),
        subscriberId: Equal(subscriberId),
      },
      relations: subscriberListRelation,
      select: subscriberListSelct,
    });
  }

  async removeSubscriberFromList(
    subscriberId: string,
    body: AddSubscriberToListDto,
    res: Response,
  ): Promise<void> {
    try {
      await this.subscriberListService.removeSubscriberFromList(
        body.data.listId,
        subscriberId,
      );
      res.send(HttpStatus.NO_CONTENT);
    } catch (err) {
      throw new BadGatewayException();
    }
  }
}
