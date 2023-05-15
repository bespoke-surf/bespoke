import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { StoreItem } from './store-item.entity';
import { StoreItemService } from './store-item.service';

@Resolver()
export class StoreItemResolver {
  constructor(private storeItemService: StoreItemService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [StoreItem])
  getFolderItems(@Args('subdomain') subdomain: string) {
    return this.storeItemService.getFolderItems(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [StoreItem])
  getEmailTemplates(@Args('subdomain') subdomain: string) {
    return this.storeItemService.getEmailTemplates(subdomain);
  }
}
