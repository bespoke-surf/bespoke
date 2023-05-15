import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Session, Shopify as ShopifyApi } from '@shopify/shopify-api';
import { Repository } from 'typeorm';
import { GET_ORDER_QUERY } from '../../graphql/order.graphql';
import {
  GetOrderQuery,
  GetOrderQueryVariables,
} from '../../__generated__/shopify-types';
import { Integration } from '../integration/integration.entity';
import { ShopifySessionStorage } from '../session/shopifySessionStorage';
import { Shopify } from './shopify.entity';
@Injectable()
export class ShopifyService {
  constructor(
    @InjectRepository(Shopify)
    private shopifyRepo: Repository<Shopify>,
    private eventEmitter: EventEmitter2,
    @InjectShopify() private readonly shopifyApi: ShopifyApi, // @InjectSentry() private readonly sentryClient: SentryService,
    @InjectSentry() private readonly sentryClient: SentryService,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
  ) {}

  async emitEvent(eventName: string, shopifyId: string) {
    const getPost = await this.shopifyRepo.findOne({
      where: { id: shopifyId },
      relations: { integration: { store: { user: true } } },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async updateShopifyProductSyncJobId(
    shopifyId: string,
    jobId: string,
  ): Promise<Shopify | null> {
    await this.shopifyRepo.update(shopifyId, {
      productSyncJobId: jobId,
    });
    const shopify = await this.shopifyRepo.findOne({
      where: { id: shopifyId },
    });
    return shopify ?? null;
  }

  async updateShopifyCustomerSyncJobId(
    shopifyId: string,
    jobId: string,
  ): Promise<Shopify | null> {
    await this.shopifyRepo.update(shopifyId, {
      customerSyncJobId: jobId,
    });
    const shopify = await this.shopifyRepo.findOne({
      where: { id: shopifyId },
    });
    return shopify ?? null;
  }

  async getShopify(shopifyId: string): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: { id: shopifyId },
      relations: {
        integration: true,
      },
    });

    return shopify;
  }
  async getShopifyWithIntegrationId(
    integrationId: string,
  ): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: {
        integration: { id: integrationId },
      },
    });
    return shopify;
  }

  async updateShopUrl(shopifyId: string, sanitizedURL: string): Promise<null> {
    await this.shopifyRepo.update(shopifyId, {
      authenticated: false,
      storeUrl: sanitizedURL,
    });
    return null;
  }

  async createShopify(
    integration: Integration,
    sanitizedURL: string,
  ): Promise<Shopify> {
    const shopify = await this.shopifyRepo.save({
      integration,
      authenticated: false,
      storeUrl: sanitizedURL,
    });
    return shopify;
  }

  async removedProductSyncJobId(shopifyId: string): Promise<null> {
    await this.shopifyRepo.update(shopifyId, {
      productSyncJobId: null,
    });
    return null;
  }
  async removedCustomerSyncJobId(shopifyId: string): Promise<null> {
    await this.shopifyRepo.update(shopifyId, {
      customerSyncJobId: null,
    });
    return null;
  }

  async sessionExpired(shopify: Shopify) {
    const shopifyIntegration = await this.shopifyRepo.findOne({
      where: {
        id: shopify.id,
      },
    });

    if (shopifyIntegration) {
      const offlineId = this.shopifyApi.session.getOfflineId(
        shopifyIntegration.storeUrl,
      );
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (session?.accessToken) {
        return false;
      }
    }

    return true;
  }

  async getShopifyCustomerEmailFromOrderId(
    orderId: string,
    shop: string,
  ): Promise<string | null> {
    try {
      const offlineId = this.shopifyApi.session.getOfflineId(shop);
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (!session) throw new Error();

      const gqlClient = new this.shopifyApi.clients.Graphql({
        session: session as Session,
      });

      const response = await gqlClient.query({
        data: {
          query: GET_ORDER_QUERY,
          variables: {
            orderId: `gid://shopify/Order/${orderId}`,
          } as GetOrderQueryVariables,
        },
      });

      const order = response.body as {
        data: GetOrderQuery;
      };
      if (order.data.order?.email) {
        return order.data.order.email;
      }
      throw new Error();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getShopifyWithStoreUrl(storeUrl: string): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: {
        storeUrl,
      },
      relations: {
        integration: {
          store: { user: true },
        },
      },
    });
    return shopify ?? null;
  }

  async getShopifyWithStoreId(storeId: string): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: {
        integration: {
          store: {
            id: storeId,
          },
        },
      },
      relations: {
        integration: {
          store: { user: true },
        },
      },
    });
    return shopify ?? null;
  }

  async removeShopifyIntegration(shopifyId: string): Promise<null> {
    try {
      const shopify = await this.shopifyRepo.findOne({
        where: { id: shopifyId },
        relations: {
          integration: {
            store: {
              user: true,
            },
          },
        },
      });

      if (!shopify) return null;

      await this.shopifyRepo.update(shopify.id, {
        authenticated: false,
      });

      const offlineId = this.shopifyApi.session.getOfflineId(shopify.storeUrl);
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (session && session?.accessToken) {
        const client = new this.shopifyApi.clients.Rest({
          session: session as Session,
        });
        client.delete({
          path: '/admin/api_permissions/current.json',
        });
      }

      await this.shopifySessionStorage.deleteSession(offlineId);

      // if (shopify.integration.store.subdomain) {
      //   await this.sendgridService.shopifyAppUninstalled(
      //     shopify.integration.store.user.email,
      //     shopify.integration.store.subdomain,
      //     shopify.storeUrl,
      //   );
      // }

      return null;
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
      return null;
    }
  }

  async authenticateShopifyIntegration(shop: string): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: {
        storeUrl: shop,
      },
    });

    if (!shopify) return null;

    await this.shopifyRepo.update(shopify.id, {
      authenticated: true,
    });

    const updatedInt = await this.shopifyRepo.findOne({
      where: {
        id: shopify.id,
      },
      relations: {
        integration: {
          store: true,
        },
      },
    });

    return updatedInt ?? null;
  }

  async collectEmailSubscribers(
    shopifyId: string,
    listId: string,
  ): Promise<Shopify | null> {
    await this.shopifyRepo.update(shopifyId, {
      listIdToCollectEmail: listId,
    });
    return null;
  }

  async removeCollectEmailSubscribers(
    shopifyId: string,
  ): Promise<Shopify | null> {
    await this.shopifyRepo.update(shopifyId, {
      listIdToCollectEmail: null,
    });
    return null;
  }

  async removeCollectEmailSubscribersForListenr(
    listId: string,
  ): Promise<Shopify | null> {
    const shopify = await this.shopifyRepo.findOne({
      where: { listIdToCollectEmail: listId },
    });
    if (shopify) {
      await this.removeCollectEmailSubscribers(shopify.id);
    }
    return null;
  }
}
