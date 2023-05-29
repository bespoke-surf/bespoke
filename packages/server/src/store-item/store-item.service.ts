import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { ItemTypeEnum } from '../item/enums/type';
import { ItemService } from '../item/item.service';
import { Item } from '../item/items.entity';
import { StoreItem } from './store-item.entity';

@Injectable()
export class StoreItemService {
  constructor(
    @InjectRepository(StoreItem)
    private readonly storeItemRepo: Repository<StoreItem>, // private readonly itemService: ItemService, // private readonly eventService: EventService,
    private readonly itemService: ItemService,
    private readonly eventService: EventService,
  ) {}

  //TODO: Make this skip and take
  async getFolderItems(subdomain: string): Promise<StoreItem[]> {
    const pageItems = await this.storeItemRepo.find({
      where: {
        store: {
          subdomain,
        },
        item: {
          type: Not(ItemTypeEnum.CREDITS),
        },
      },
      relations: { item: true },
    });
    return pageItems;
  }

  //TODO: Make this skip and take
  async getEmailTemplates(subdomain: string): Promise<StoreItem[]> {
    const pageItems = await this.storeItemRepo.find({
      where: {
        store: {
          subdomain,
        },
        item: {
          type: ItemTypeEnum.EMAIL_TEMPLATE,
        },
      },
      relations: { item: true },
    });
    return pageItems;
  }

  async addSubscriptionRewardItem(storeId: string): Promise<null> {
    const pathCrateItems = await this.itemService.getSubscriptionRewardItems();
    let addSub = false;

    const addItems = async (item: Item) => {
      const itemsExist = await this.storeItemRepo.findOne({
        where: {
          itemId: item.id,
          storeId,
        },
      });
      if (!itemsExist) {
        addSub = true;
        await this.storeItemRepo.save({
          itemId: item.id,
          storeId,
        });
      }
    };

    const promises = [];
    for (const item of pathCrateItems) {
      promises.push(addItems(item));
    }
    await Promise.all(promises);

    if (addSub) {
      const storeItem = await this.storeItemRepo.findOne({
        where: {
          storeId,
        },
        relations: {
          store: {
            user: true,
          },
        },
      });
      if (storeItem?.store.user.id) {
        this.eventService.createEvent({
          eventAccessRestriction: EventAccessRestriction.HIGH,
          eventProducerId: storeId,
          eventState: EventState.COMPLETED,
          eventType: EventType.STORE,
          message: 'You received your monthly Subscription Rewards!',
          userId: storeItem.store.user.id,
          showAsNotification: true,
          link: '/plan/subscription-rewards',
        });
      }
    }
    return null;
  }

  async addDefaultTemplatesAndForms(storeId: string): Promise<null> {
    const pathCrateItems = await this.itemService.getDefaultTemplatesAndForms();
    let addSub = false;

    const addItems = async (item: Item) => {
      const itemsExist = await this.storeItemRepo.findOne({
        where: {
          itemId: item.id,
          storeId,
        },
      });
      if (!itemsExist) {
        addSub = true;
        await this.storeItemRepo.save({
          itemId: item.id,
          storeId,
        });
      }
    };

    const promises = [];
    for (const item of pathCrateItems) {
      promises.push(addItems(item));
    }
    await Promise.all(promises);

    if (addSub) {
      const storeItem = await this.storeItemRepo.findOne({
        where: {
          storeId,
        },
        relations: {
          store: {
            user: true,
          },
        },
      });
      if (storeItem?.store.user.id) {
        this.eventService.createEvent({
          eventAccessRestriction: EventAccessRestriction.HIGH,
          eventProducerId: storeId,
          eventState: EventState.COMPLETED,
          eventType: EventType.STORE,
          message: 'Added 9 Templates & 2 Forms',
          userId: storeItem.store.user.id,
          showAsNotification: true,
          link: '/folder',
        });
      }
    }
    return null;
  }

  async getStoreItem(
    itemId: string,
    storeId: string,
  ): Promise<StoreItem | null> {
    const storeItem = await this.storeItemRepo.findOne({
      where: {
        itemId,
        storeId,
      },
    });
    return storeItem ?? null;
  }
}
