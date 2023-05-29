import { Query, Resolver } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './items.entity';

@Resolver()
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}
  @Query(() => [Item])
  getSubscriptionRewardItems(): Promise<Item[]> {
    return this.itemService.getSubscriptionRewardItems();
  }
}
