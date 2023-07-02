import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { defaultTemplateAndForms } from '../item/data/defaultTemplatesAndForms';
import { subscrpitonRewardItems } from '../item/data/subscriptonRewards';
import { ItemService } from '../item/item.service';
import { ItemCategoryTypeEnum } from './enum/itemCategoryType';
import { ItemCategory } from './itemCategory.entity';

@Injectable()
export class ItemCategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(ItemCategory)
    private readonly itemCategoryRepo: Repository<ItemCategory>, // private readonly itemService: ItemService,
    private readonly itemService: ItemService,
  ) {}

  onModuleInit() {
    // this.seedSubscriptionReward();
    // this.seedDefaultTemplateAndForms();
  }

  async createCategory({
    type,
  }: {
    type: ItemCategoryTypeEnum;
  }): Promise<ItemCategory> {
    const created = await this.itemCategoryRepo.findOne({
      where: {
        type,
      },
    });

    if (created) return created;
    const newCategory = await this.itemCategoryRepo.save({
      type,
    });
    return newCategory;
  }

  async seedSubscriptionReward() {
    const category = await this.createCategory({
      type: ItemCategoryTypeEnum.SCUBSCRIPTION,
    });

    for (const item of subscrpitonRewardItems) {
      await this.itemService.createItem({
        ...item,
        itemCategoryId: category.id,
      });
    }
  }
  async seedDefaultTemplateAndForms() {
    const category = await this.createCategory({
      type: ItemCategoryTypeEnum.FREE,
    });

    for (const item of defaultTemplateAndForms) {
      await this.itemService.createItem({
        ...item,
        itemCategoryId: category.id,
      });
    }
  }
}
