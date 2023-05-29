import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { ItemCategoryTypeEnum } from '../itemCategory/enum/itemCategoryType';
import { DAYJS_TIMESTAMPZ_FORMAT } from '../utils/constants';
import { Item } from './items.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async getItemWithItemCategory(itemId: string): Promise<Item | null> {
    const item = await this.itemRepo.findOne({
      where: {
        id: itemId,
      },
      relations: {
        itemCategory: true,
      },
    });
    return item ?? null;
  }

  async createItem(input: Partial<Item>): Promise<Item> {
    const itemExist = await this.itemRepo.findOne({
      where: {
        name: input.name,
        type: input.type,
        itemCategoryId: input.itemCategoryId,
      },
    });
    if (itemExist) return itemExist;

    const item = await this.itemRepo.save({ ...input });
    return item;
  }

  async getSubscriptionRewardItems() {
    const startOfMonth = new Date(
      dayjs().startOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
    );
    const endOfMonth = new Date(
      dayjs().endOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
    );
    const items = await this.itemRepo.find({
      where: {
        start_date: startOfMonth,
        end_date: endOfMonth,
        itemCategory: {
          type: ItemCategoryTypeEnum.SCUBSCRIPTION,
        },
      },
    });
    return items;
  }
  async getDefaultTemplatesAndForms() {
    const items = await this.itemRepo.find({
      where: {
        itemCategory: {
          type: ItemCategoryTypeEnum.FREE,
        },
      },
    });
    return items;
  }
}
