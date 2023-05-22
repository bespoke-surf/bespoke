import type { PricingIdType } from '@bespoke/common/dist/pricingPlan';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Session, Shopify } from '@shopify/shopify-api';
import dayjs from 'dayjs';
import { Redis } from 'ioredis';
import Stripe from 'stripe';
import {
  ActiveSubscriptionsQuery,
  AppSubscriptionStatus,
} from '../__generated__/shopify-types';
import { ACTIVE_SUBSCRIPTIONS_QUERY } from '../graphql/activeSubscriptions.graphql';
import { BillingService } from './billing/billing.service';
import { BillingSubscriptionEntity } from './billing/enum/billingSubscriptionEntity.enum';
import { SHOPIFY_APP_SUBSCRIPTON_BESPOKE_PRICING_ID_PREFIX } from './constants';
import { MetricService } from './metric/metirc.service';
import { Metric } from './metric/metric.entity';
import { SesService } from './ses/ses.service';
import { ShopifySessionStorage } from './session/shopifySessionStorage';
import { ShopifyService } from './shopify/shopify.service';
import { StoreService } from './store/store.service';
import { EmailConcentCollectedFrom } from './subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from './subscriber-list/enum/emailConcentOptInLevel.enum';
import { SubscriberService } from './subscriber/subscriber.service';
import { UserService } from './user/user.service';
@Injectable()
export class AppService {
  constructor(
    private readonly shopifyService: ShopifyService,
    @InjectRedis() private readonly redis: Redis,
    private storeService: StoreService,
    private userService: UserService,
    private sesService: SesService,
    private subscriberService: SubscriberService,
    private billingService: BillingService,
    private metricService: MetricService,
    // private storeItemService: StoreItemService,
    @InjectSentry() private readonly sentryService: SentryService,
    @InjectShopify() private readonly shopifyApi: Shopify, // @InjectSentry() private readonly sentryService: SentryService,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
  ) {}

  async processCustomersDataRequest(
    shop_domain: string,
    body: { customer: { id: number; email: string } },
  ) {
    try {
      const email = body.customer.email;
      const shopify = await this.shopifyService.getShopifyWithStoreUrl(
        shop_domain,
      );
      if (!shopify) throw new Error(`shopify no found ${shop_domain}`);
      const subdomain = shopify.integration.store.subdomain;
      if (!subdomain) throw Error('subdomain missing');
      const subscriber = await this.subscriberService.getSubscriberWithEmail(
        subdomain,
        email,
      );

      if (!subscriber) throw new Error(`subscriber no found ${shop_domain}`);

      await this.sesService.shopifyCustomerDataRequest(
        shopify.integration.store.user.email,
        subdomain,
        subscriber?.id,
        subscriber?.user.email,
      );
    } catch (e) {
      console.error(e);
      this.sentryService.instance().captureException(e);
    }
  }

  async processCustomersRedact(
    shop_domain: string,
    body: { customer: { email: string } },
  ) {
    try {
      const email = body.customer.email;
      const shopify = await this.shopifyService.getShopifyWithStoreUrl(
        shop_domain,
      );
      if (!shopify) throw new Error(`shopify no found ${shop_domain}`);
      const subdomain = shopify.integration.store.subdomain;
      if (!subdomain) throw new Error('subdomain missing');
      const subscriber = await this.subscriberService.getSubscriberWithEmail(
        subdomain,
        email,
      );

      if (!subscriber) throw new Error(`subscriber no found ${shop_domain}`);

      const redacted =
        await this.subscriberService.redctSubscriberDetailsForShopify(
          subscriber.id,
        );

      if (!redacted)
        throw new Error(
          ` shop redact subscriber details failed ${shop_domain}`,
        );
      await this.sesService.shopifyCustomerDataErasureRequest(
        shopify.integration.store.user.email,
        subscriber.user.email,
      );
    } catch (e) {
      console.error(e);
      this.sentryService.instance().captureException(e);
    }
  }

  async processShopRedact(shop_domain: string, body: { shop_domain: string }) {
    try {
      const shop = shop_domain || body.shop_domain;
      const shopify = await this.shopifyService.getShopifyWithStoreUrl(shop);
      if (!shopify) throw new Error(`shopify no found ${shop}`);

      // const shopDeleted = await this.shopifyService.removeShopify(shopify?.id);
      // if (!shopDeleted) throw new Error(`shop deleting failed ${shop}`);

      //TODO: change this deletion with a queue
      await this.metricService.removeShopifyMetricData(
        shopify.integration.store.id,
      );

      if (!shopify.integration.store.subdomain)
        throw new Error('subdomain missing');

      await this.sesService.shopifyShopRedactRequest(
        shopify.integration.store.user.email,
        shop_domain,
      );
    } catch (e) {
      console.error(e);
      this.sentryService.instance().captureException(e);
    }
  }

  async handleBillingFromShopify(body: any, shop: string) {
    try {
      const data: {
        app_subscription: {
          admin_graphql_api_id: string;
          name: string;
          status: AppSubscriptionStatus;
          admin_graphql_api_shop_id: string;
          created_at: string;
          updated_at: string;
        };
      } = body;

      if (
        data.app_subscription.status === 'CANCELLED' ||
        data.app_subscription.status === 'DECLINED' ||
        data.app_subscription.status === 'EXPIRED'
      ) {
        const billing =
          await this.billingService.getStoreBillingWithSubscriptionId(
            data.app_subscription.admin_graphql_api_id,
          );

        if (billing) {
          await this.billingService.cancelCurrentBilling(billing.id);
        }
        return null;
      }

      const shopify = await this.shopifyService.getShopifyWithStoreUrl(shop);

      if (!shopify?.integration.store.subdomain) throw new Error();

      const billing = await this.billingService.getStoreBilling(
        shopify?.integration.store.subdomain,
      );

      if (!billing?.id) throw new Error();

      if (shopify.authenticated === false) throw new Error();

      if (!shopify.storeUrl) throw new Error();

      const offlineId = this.shopifyApi.session.getOfflineId(shop);

      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (!session) throw new Error();

      const gqlClient = new this.shopifyApi.clients.Graphql({
        session: session as Session,
      });

      const response = await gqlClient.query({
        data: {
          query: ACTIVE_SUBSCRIPTIONS_QUERY,
        },
      });

      const {
        data: {
          currentAppInstallation: { activeSubscriptions },
        },
      } = response.body as {
        data: ActiveSubscriptionsQuery;
      };

      const acitveSub = activeSubscriptions[0];
      if (!acitveSub) throw new Error('active sub missing');

      const { status, currentPeriodEnd, id } = acitveSub;

      let subStatus: Stripe.Subscription.Status | undefined = undefined;

      if (status === 'ACTIVE') {
        subStatus = 'active';
      } else if (status === 'CANCELLED') {
        // wont reach here, handled above
        subStatus = 'canceled';
      } else if (status === 'DECLINED') {
        // wont reach here, handled above
        subStatus = 'canceled';
      } else if (status === 'EXPIRED') {
        subStatus = 'incomplete_expired';
      } else if (status === 'FROZEN') {
        subStatus = 'past_due';
      }

      if (status === 'PENDING' || subStatus === undefined) throw new Error();

      const bespokePlanId = (await this.redis.get(
        `${SHOPIFY_APP_SUBSCRIPTON_BESPOKE_PRICING_ID_PREFIX}${id}`,
      )) as PricingIdType | null;

      if (!bespokePlanId) {
        throw new Error('qunatity missing');
      }

      await this.billingService.subscriptionUpdate({
        billingId: billing?.id,
        cancelAtPeriodEnd:
          subStatus === 'canceled' || subStatus === 'incomplete_expired'
            ? true
            : false,
        currentPeriodEnd: dayjs(currentPeriodEnd).unix(),
        status: subStatus,
        bespokePlanId,
        billingSubscriptionEntity: BillingSubscriptionEntity.SHOPIFY,
      });

      // doesnt matter if we need to check if exist or not, always update doenst break anything!
      await this.billingService.updateSubscriptionId(id, billing.id);

      // delete key if the sub is cancelled. New sub gets created where key is set with quanitty.
      if (subStatus === 'canceled' || subStatus === 'incomplete_expired') {
        this.redis.del(
          `${SHOPIFY_APP_SUBSCRIPTON_BESPOKE_PRICING_ID_PREFIX}${id}`,
        );
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async handlRefundCreateFromShopify(body: any, shop: string) {
    try {
      const storeRefundCreate =
        await this.shopifyService.getShopifyWithStoreUrl(shop);

      const refundCreate = body;

      const orderId = refundCreate['order_id'];

      if (!orderId) throw new Error();

      const email =
        await this.shopifyService.getShopifyCustomerEmailFromOrderId(
          orderId,
          shop,
        );

      if (!email) throw new Error();
      if (!storeRefundCreate) throw new Error();

      if (!storeRefundCreate.integration.store.subdomain)
        throw new Error('subdomain missing');

      await this.subscriberService.orderRefund(
        body,
        storeRefundCreate?.integration.store.subdomain,
        email,
      );

      return null;
    } catch (err) {
      return null;
    }
  }

  async handleCheckoutUpdate(
    data: any,
    subdomain: string,
    listId?: string | null | undefined,
  ): Promise<Metric | null> {
    const checkoutUpdateData = data;

    const email = checkoutUpdateData['email'];
    const id = checkoutUpdateData['id'];
    const firstName = checkoutUpdateData?.['customer']?.['first_name'];
    const lastName = checkoutUpdateData?.['customer']?.['last_name'];

    if (!email) return null;

    let subscriber;

    subscriber = await this.subscriberService.getSubscriberWithEmail(
      subdomain,
      email,
    );

    const store = await this.storeService.getStoreWithSubdomain(subdomain);
    if (!store) return null;

    if (!subscriber) {
      subscriber = await this.userService.addSubscriberToStore({
        email,
        storeId: store.id,
        firstName,
        lastName,
      });
    }

    if (!subscriber) return null;

    if (checkoutUpdateData['buyer_accepts_marketing'] === true && listId) {
      await this.subscriberService.addSubscriberToList(
        listId,
        subscriber.id,
        EmailConcentCollectedFrom.IMPORT,
        EmailConcentOptInLevel.SINGLE_OPT_IN,
      );
    }

    const checkIfAdded = await this.metricService.checkIfDataAdded(
      id,
      subscriber.id,
    );

    if (checkIfAdded) return null;
    const metric = await this.metricService.createCheckoutStartedMetric(
      data,
      subscriber.id,
      store.id,
    );
    return metric ?? null;
  }
}
