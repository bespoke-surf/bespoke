import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithShopify } from '../guard/hasStoreAccessWithShopify';
import { Shopify } from './shopify.entity';
import { ShopifyService } from './shopify.service';

@Resolver(() => Shopify)
export class ShopifyResolver {
  constructor(private shopifyService: ShopifyService) {}
  @ResolveField()
  async sessionExpired(@Parent() shopify: Shopify) {
    return this.shopifyService.sessionExpired(shopify);
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'add shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  collectEmailSubscribers(
    @Args('shopifyId')
    shopifyId: string,
    @Args('listId')
    listId: string,
  ): Promise<Shopify | null> {
    return this.shopifyService.collectEmailSubscribers(shopifyId, listId);
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'add shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  removeCollectEmailSubscribers(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<Shopify | null> {
    return this.shopifyService.removeCollectEmailSubscribers(shopifyId);
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'remove shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  removeShopifyIntegration(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<null> {
    return this.shopifyService.removeShopifyIntegration(shopifyId);
  }
}
