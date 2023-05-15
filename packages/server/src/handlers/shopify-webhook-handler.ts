import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Shopify } from '@shopify/shopify-api';
import { AppService } from '../app.service';
import { BillingService } from '../billing/billing.service';
import { ShopifySessionStorage } from '../session/shopifySessionStorage';
import { ShopifyService } from '../shopify/shopify.service';
import { StoreService } from '../store/store.service';
import { SubscriberService } from '../subscriber/subscriber.service';
import { UserService } from '../user/user.service';

@Injectable()
@WebhookHandler('APP_UNINSTALLED')
export class AppUninstalled extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly billingService: BillingService,
    @InjectShopify() private readonly shopifyApi: Shopify,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string): Promise<void> {
    try {
      const sessionId = this.shopifyApi.session.getOfflineId(shop);

      await this.shopifySessionStorage.deleteSession(sessionId);
      const shopify = await this.shopifyService.getShopifyWithStoreUrl(shop);
      if (shopify) {
        await this.shopifyService.removeShopifyIntegration(shopify?.id);
      }
      if (shopify?.integration.store.subdomain && shopify.authenticated) {
        const billing = await this.billingService.getStoreBilling(
          shopify?.integration?.store?.subdomain,
        );
        if (billing) {
          await this.billingService.cancelCurrentBilling(billing.id);
        }
      }
    } catch (err) {
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('CHECKOUTS_UPDATE')
export class CheckoutUpdate extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly appService: AppService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      // this deals with checkout update, we chekc if already exist and not trigger the second time
      const storeCheckoutUpdate =
        await this.shopifyService.getShopifyWithStoreUrl(shop);
      if (!storeCheckoutUpdate) throw new Error('no checkout update');
      if (!storeCheckoutUpdate.integration.store.subdomain)
        throw new Error('subdomain missing');

      await this.appService.handleCheckoutUpdate(
        body,
        storeCheckoutUpdate?.integration.store.subdomain,
        storeCheckoutUpdate.listIdToCollectEmail,
      );
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}
@Injectable()
@WebhookHandler('ORDERS_CREATE')
export class OrderCreate extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly subscriberService: SubscriberService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      const store = await this.shopifyService.getShopifyWithStoreUrl(shop);
      if (!store) return;
      if (!store.integration.store.subdomain)
        throw new Error('sumdomain missing');

      await this.subscriberService.placedOrder(
        body,
        store?.integration.store.subdomain,
      );
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('ORDERS_FULFILLED')
export class OrderFulfilled extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly subscriberService: SubscriberService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      const storeWithURL = await this.shopifyService.getShopifyWithStoreUrl(
        shop,
      );
      if (!storeWithURL?.integration.store.subdomain)
        throw new Error('sumdomain missing');

      await this.subscriberService.fulfilledOrder(
        body,
        storeWithURL?.integration.store.subdomain,
      );
    } catch (err) {
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('ORDERS_CANCELLED')
export class OrdersCancelled extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly subscriberService: SubscriberService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      const storeWithURL = await this.shopifyService.getShopifyWithStoreUrl(
        shop,
      );
      if (!storeWithURL?.integration.store.subdomain)
        throw new Error('missing subdomin');

      await this.subscriberService.cancelledOrder(
        body,
        storeWithURL?.integration.store.subdomain,
      );
    } catch (err) {
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('REFUNDS_CREATE')
export class RefundsCreate extends ShopifyWebhookHandler {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      await this.appService.handlRefundCreateFromShopify(body, shop);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('APP_SUBSCRIPTIONS_UPDATE')
export class AppSubscriptionUpdate extends ShopifyWebhookHandler {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      await this.appService.handleBillingFromShopify(body, shop);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('CUSTOMERS_UPDATE')
export class CustomersUpdate extends ShopifyWebhookHandler {
  constructor(
    private readonly userService: UserService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      await this.userService.createOrUpdateShopifyCustomer(body, shop);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('CUSTOMERS_CREATE')
export class CustomersCreate extends ShopifyWebhookHandler {
  constructor(
    private readonly userService: UserService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: object): Promise<void> {
    try {
      await this.userService.createOrUpdateShopifyCustomer(body, shop);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('PRODUCTS_CREATE')
export class ProductCreate extends ShopifyWebhookHandler {
  constructor(
    @InjectSentry() private readonly sentryService: SentryService,
    private readonly storeService: StoreService,
  ) {
    super();
  }

  async handle(
    shop: string,
    body: { admin_graphql_api_id: string },
  ): Promise<void> {
    try {
      await this.storeService.handleCreateOrUpdateShopifyProduct(
        shop,
        body.admin_graphql_api_id,
      );
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}
@Injectable()
@WebhookHandler('PRODUCTS_UPDATE')
export class ProductUpdate extends ShopifyWebhookHandler {
  constructor(
    @InjectSentry() private readonly sentryService: SentryService,
    private readonly storeService: StoreService,
  ) {
    super();
  }

  async handle(
    shop: string,
    body: { admin_graphql_api_id: string },
  ): Promise<void> {
    try {
      await this.storeService.handleCreateOrUpdateShopifyProduct(
        shop,
        body.admin_graphql_api_id,
      );
    } catch (err) {
      console.log(JSON.stringify(err));
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('COLLECTIONS_DELETE')
export class CollectionsDelete extends ShopifyWebhookHandler {
  constructor(@InjectSentry() private readonly sentryService: SentryService) {
    super();
  }

  async handle(): Promise<void> {
    try {
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('COLLECTIONS_UPDATE')
export class CollectionsUpdate extends ShopifyWebhookHandler {
  constructor(@InjectSentry() private readonly sentryService: SentryService) {
    super();
  }

  async handle(): Promise<void> {
    try {
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('CUSTOMERS_DATA_REQUEST')
export class CustomerDataRequest extends ShopifyWebhookHandler {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {
    super();
  }

  async handle(shop: string, body: any): Promise<void> {
    try {
      this.appService.processCustomersDataRequest(shop, body);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('CUSTOMERS_REDACT')
export class CustomerRedact extends ShopifyWebhookHandler {
  constructor(
    @InjectSentry() private readonly sentryService: SentryService,
    private readonly appService: AppService,
  ) {
    super();
  }

  async handle(shop: string, body: any): Promise<void> {
    try {
      this.appService.processCustomersRedact(shop, body);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

@Injectable()
@WebhookHandler('SHOP_REDACT')
export class ShopRedact extends ShopifyWebhookHandler {
  constructor(
    @InjectSentry() private readonly sentryService: SentryService,
    private readonly appService: AppService,
  ) {
    super();
  }

  async handle(shop: string, body: any): Promise<void> {
    try {
      this.appService.processShopRedact(shop, body);
    } catch (err) {
      console.log(err);
      this.sentryService.instance().captureException(err);
    }
  }
}

export const ShopifyWebhookHandlers = [
  AppUninstalled,
  CheckoutUpdate,
  OrderCreate,
  OrderFulfilled,
  OrdersCancelled,
  RefundsCreate,
  AppSubscriptionUpdate,
  CustomersUpdate,
  CustomersCreate,
  ProductCreate,
  ProductUpdate,
  CollectionsDelete,
  CollectionsUpdate,
  CustomerDataRequest,
  CustomerRedact,
  ShopRedact,
];
