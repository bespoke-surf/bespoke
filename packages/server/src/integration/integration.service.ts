import { InjectShopify } from '@nestjs-shopify/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shopify as ShopifyApi } from '@shopify/shopify-api';
import { Repository } from 'typeorm';
import { Shopify } from '../shopify/shopify.entity';
import { ShopifyService } from '../shopify/shopify.service';
import { Store } from '../store/store.entity';
import { Integration } from './integration.entity';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integration)
    private integrationRepo: Repository<Integration>,
    private shopifyService: ShopifyService,
    @InjectShopify() private readonly shopifyApi: ShopifyApi,
  ) {}

  async createIntegration(store: Store): Promise<Integration | null> {
    const integration = await this.integrationRepo.save({
      store,
    });
    await this.integrationRepo.findOne({
      where: { id: integration.id },
      relations: {
        store: {
          user: true,
        },
      },
    });
    return integration ?? null;
  }

  async getIntegrationWithSubdomain(
    subdomain: string,
  ): Promise<Integration | null> {
    const integration = await this.integrationRepo.findOne({
      where: {
        store: {
          subdomain,
        },
      },
      relations: {
        shopify: true,
      },
    });

    return integration ?? null;
  }

  async addShopifyIntegration(
    storeId: string,
    storeUrl: string,
  ): Promise<Shopify | null> {
    try {
      const sanitizedURL = this.shopifyApi.utils.sanitizeShop(storeUrl);
      if (!sanitizedURL) throw new Error('no sanitized url');
      const integration = await this.integrationRepo.findOne({
        where: {
          store: {
            id: storeId,
          },
        },
        relations: {
          store: true,
        },
      });

      if (!integration) throw new Error('no store or integration');

      let shopify = await this.shopifyService.getShopifyWithStoreId(storeId);

      if (!shopify) {
        shopify = await this.shopifyService.createShopify(
          integration,
          sanitizedURL,
        );
      } else {
        await this.shopifyService.updateShopUrl(shopify?.id, sanitizedURL);
      }

      const updatedShopify = await this.shopifyService.getShopify(shopify?.id);

      return updatedShopify ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
