import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Subscriber } from './subscriber.entity';

@Injectable()
export class SubscriberApiService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
  ) {}

  async getSubscriber(id: string): Promise<Subscriber> {
    try {
      const subscriber = await this.subscriberRepo.findOneByOrFail({
        id: Equal(id),
      });
      return subscriber;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
