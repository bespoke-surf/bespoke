import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { ApiKeyService } from '../apiKey/apiKey.service';
import { EmailConcentCollectedFrom } from '../subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from '../subscriber-list/enum/emailConcentOptInLevel.enum';
import { EmailConcentState } from '../subscriber-list/enum/emailConcentState.enum';
import { SubscriberListApiService } from '../subscriber-list/subscriber-list.api.service';
import { SubscriberList } from '../subscriber-list/subscriber-list.entity';
import { SubscriberListService } from '../subscriber-list/subscriber-list.service';
import { AddSubscriberToListDto } from './dto/addSubscriberToList';
import { UpdateEmailConcentDto } from './dto/updateEmailConcent';
import { UpdateSubscriberDto } from './dto/updateSubscriber';
import { UpdateSubscriberEmailStatusDto } from './dto/updateSubscriberEmailStatus';
import {
  Subscriber,
  SubscriberAddress,
  subscriberRelations,
  subscriberSelect,
} from './subscriber.entity';
import { SubscriberService } from './subscriber.service';

@Injectable()
export class SubscriberApiService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
    @InjectRepository(SubscriberAddress)
    private subscriberAddressRepo: Repository<SubscriberAddress>,
    private subscriberService: SubscriberService,
    private subscriberListApiService: SubscriberListApiService,
    private subscriberListService: SubscriberListService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async getSubscriber(id: string): Promise<Subscriber> {
    const subscriber = await this.subscriberRepo.findOne({
      where: {
        id: Equal(id),
      },
      select: subscriberSelect,
      relations: subscriberRelations,
    });
    if (!subscriber) throw new NotFoundException();
    return subscriber;
  }

  async getSubscribers({
    apiKey,
    limit = 100,
    offset = 0,
  }: {
    apiKey: string;
    limit: number;
    offset: number;
  }): Promise<Subscriber[]> {
    try {
      const subscriber = await this.subscriberRepo.find({
        where: {
          store: {
            apiKey: {
              key: apiKey,
            },
          },
        },
        select: subscriberSelect,
        relations: subscriberRelations,
        take: limit,
        skip: offset,
      });
      return subscriber;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updateSubscriber(
    id: string,
    body: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    console.log({ id });
    const { firstName, lastName, location, phoneNumber } = body.data.attributes;
    const { address1, address2, city, country, state, zipCode } = location;

    const subscriber = await this.subscriberRepo.findOne({
      where: {
        id,
      },
      relations: {
        subscriberAddress: true,
      },
    });
    console.log({ subscriber });
    if (!subscriber) throw new NotFoundException();

    if (firstName && firstName !== undefined) {
      await this.subscriberRepo.update(id, {
        firstName,
      });
    }
    if (lastName && lastName !== undefined) {
      await this.subscriberRepo.update(id, {
        lastName,
      });
    }
    if (phoneNumber && phoneNumber !== undefined) {
      await this.subscriberRepo.update(id, {
        phoneNumber,
      });
    }

    const subscriberAddressId = subscriber?.subscriberAddress?.id;

    if (!subscriberAddressId) {
      const subscriberAddress = await this.subscriberAddressRepo.save({
        address1,
        address2,
        city,
        country,
        state,
        zipCode,
      });

      await this.subscriberRepo.update(id, {
        subscriberAddress,
      });
    }

    if (address1 && address1 !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        address1,
      });
    }
    if (address2 && address2 !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        address2,
      });
    }
    if (city && city !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        city,
      });
    }
    if (country && country !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        country,
      });
    }
    if (state && state !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        state,
      });
    }
    if (zipCode && zipCode !== undefined && subscriberAddressId) {
      await this.subscriberAddressRepo.update(subscriberAddressId, {
        zipCode,
      });
    }
    const updatedSubscriber = await this.subscriberRepo.findOne({
      where: {
        id,
      },
      select: subscriberSelect,
      relations: subscriberRelations,
    });
    if (!updatedSubscriber) throw new BadRequestException();
    return updatedSubscriber;
  }

  async updateSubscriberEmailStatus(
    id: string,
    body: UpdateSubscriberEmailStatusDto,
  ): Promise<Subscriber> {
    const subscriber = await this.subscriberRepo.findOneBy({ id });
    if (!subscriber) throw new NotFoundException();

    await this.subscriberRepo.update(id, {
      emailStatus: body.data.attributes.emailStatus,
    });

    const updatedSubscriber = await this.subscriberRepo.findOne({
      where: {
        id,
      },
      select: subscriberSelect,
      relations: subscriberRelations,
    });
    if (!updatedSubscriber) throw new BadRequestException();
    return updatedSubscriber;
  }

  async addSubscriberToList(
    subscriberId: string,
    body: AddSubscriberToListDto,
  ): Promise<SubscriberList> {
    const subscriberList = await this.subscriberService.addSubscriberToList(
      body.data.listId,
      subscriberId,
      EmailConcentCollectedFrom.OTHER,
      EmailConcentOptInLevel.SINGLE_OPT_IN,
    );
    if (!subscriberList) throw new BadGatewayException();

    const newSub = await this.subscriberListApiService.getSubscriberList(
      body.data.listId,
      subscriberId,
    );

    if (!newSub) throw new NotFoundException();
    return newSub;
  }

  async updateEmailConcent(
    subscriberId: string,
    body: UpdateEmailConcentDto,
  ): Promise<SubscriberList> {
    try {
      if (body.data.attributes.state === EmailConcentState.SUBSCRIBED) {
        await this.subscriberListService.addOrSubscribeToList(
          body.data.listId,
          subscriberId,
          EmailConcentCollectedFrom.OTHER,
          EmailConcentOptInLevel.SINGLE_OPT_IN,
        );
      }
      if (body.data.attributes.state === EmailConcentState.UNSUBSCRIBED) {
        await this.subscriberListService.unsubscrbeFromList(
          subscriberId,
          body.data.listId,
        );
      }

      const newSub = await this.subscriberListApiService.getSubscriberList(
        body.data.listId,
        subscriberId,
      );

      return newSub;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getSubscriberCount(apiKey: string): Promise<number> {
    try {
      const api = await this.apiKeyService.getApiKey(apiKey);
      return await this.subscriberRepo.count({
        where: {
          storeId: api?.storeId,
        },
      });
    } catch (err) {
      return 0;
    }
  }
}
