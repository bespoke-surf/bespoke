import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import { ShopifyWebhooksService } from '@nestjs-shopify/webhooks';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiVersion,
  Session,
  Shopify as ShopifyApi,
} from '@shopify/shopify-api';
import type { Shop } from '@shopify/shopify-api/rest/admin/2022-10/shop';
import * as cookie from 'cookie';
import * as signature from 'cookie-signature';
import { Request, Response } from 'express';
import { GET_SCRIPTS_TAGS_QUERY } from '../../graphql/getScriptTags.graphql';
import { SCRIPT_TAG_CREATE } from '../../graphql/scriptags.graphql';
import {
  GetScriptTagsQuery,
  GetScriptTagsQueryVariables,
  ScriptTagInput,
} from '../../__generated__/shopify-types';
import { BillingService } from '../billing/billing.service';
import { BillingSubscriptionEntity } from '../billing/enum/billingSubscriptionEntity.enum';
import { BillingSubscriptionStatus } from '../billing/enum/billingSubscriptionStatus.enum';
import { IntegrationService } from '../integration/integration.service';
import { ListService } from '../list/list.service';
import { ShopifySessionStorage } from '../session/shopifySessionStorage';
import { ShopifyService } from '../shopify/shopify.service';
import { StoreCurrency } from '../store/enum/currency.enum';
import { StoreService } from '../store/store.service';
import { EnvironmentVariables } from '../types';
import { UserService } from '../user/user.service';
@Injectable()
export class MyShopifyAuthHandler {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private readonly shopifyService: ShopifyService,
    private shopifyWebhookService: ShopifyWebhooksService,
    private storeService: StoreService,
    private userService: UserService,
    private billingService: BillingService,
    private listService: ListService,
    private integrationService: IntegrationService,
    @InjectShopify() private readonly shopifyApi: ShopifyApi,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
  ) {}

  async afterAuth(req: Request, res: Response, session: Session) {
    const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
    const FRONTEND_HOST_PROTOCOL = this.configService.get(
      'FRONTEND_HOST_PROTOCOL',
    );

    const client = new this.shopifyApi.clients.Rest({ session });

    const shopifyStore = await client.get({
      path: `/admin/api/${ApiVersion.October22}/shop.json`,
      query: {
        fields:
          'name, email, shop_owner, address1, address2, city, country_code, province_code, zip, customer_email',
      },
    });

    const { shop } = shopifyStore?.body as { shop: Shop };

    try {
      if (!shop.email) throw new Error();
      const user = await this.userService.getUserByEmail(shop.email);
      if (!user) throw new Error();

      const shopify = await this.shopifyService.getShopifyWithStoreUrl(
        session.shop,
      );

      const storedSession = await this.shopifySessionStorage.loadSession(
        session.id,
      );

      if (
        !storedSession ||
        !shopify ||
        shopify.integration.store.user.email !== shop.email ||
        shopify.authenticated === false
      )
        throw new Error();

      return await this.validRedirect(req, res, user.id);
    } catch (err) {
      if (session.accessToken) {
        await this.shopifyWebhookService.registerWebhooks(session);

        // await this.shopifyApi.webhooks.addHandlers({
        //   CUSTOMERS_DATA_REQUEST: {
        //     deliveryMethod: DeliveryMethod.Http,
        //     callbackUrl: '/store/shopify/webhooks',
        //     callback: this.appService.processCustomersDataRequest,
        //   },
        //   CUSTOMERS_REDACT: {
        //     deliveryMethod: DeliveryMethod.Http,
        //     callbackUrl: '/store/shopify/webhooks',
        //     callback: this.appService.processCustomersRedact,
        //   },
        //   SHOP_REDACT: {
        //     deliveryMethod: DeliveryMethod.Http,
        //     callbackUrl: '/store/shopify/webhooks',
        //     callback: this.appService.processShopRedact,
        //   },
        // });
      }

      const gqlClient = new this.shopifyApi.clients.Graphql({ session });

      const shopify = await this.shopifyService.getShopifyWithStoreUrl(
        session.shop,
      );

      try {
        if (!shop.email) throw new Error();

        // const user = await this.userService.getUserByEmail(shop?.customer_email);

        let user = await this.userService.getUserByEmail(shop.email);

        if (!user) {
          if (shop.shop_owner) {
            user = await this.userService.signupWithEmail({
              email: shop.email,
              name: shop.shop_owner,
            });
          } else {
            user = await this.userService.createUserWithEmailAndNoName(
              shop.email,
            );
          }
        }

        if (!user) throw new Error('user missing');

        let store = await this.storeService.getUserStore(user.id);

        if (store?.subdomain) {
          // cannot integrate if using stripe as billing entity and the account should be cancelled.
          const billing = await this.billingService.getStoreBilling(
            store.subdomain,
          );
          if (
            billing?.billingSubscriptionEntity ===
              BillingSubscriptionEntity.STRIPE &&
            billing.billingSubscriptionStatus !==
              BillingSubscriptionStatus.CANCELED
          ) {
            throw new Error('invalid billing entity');
          }
        }

        let storeWasCreated = false;

        if (!store) {
          store = await this.storeService.createStore(user);
          storeWasCreated = true;
          if (
            shop.currency &&
            Object.values(StoreCurrency).includes(
              shop.currency as StoreCurrency,
            )
          ) {
            await this.storeService.updateStoreCurrency(
              store.id,
              shop.currency as StoreCurrency,
            );
          }
          await this.storeService.updateStoreDetails({
            address1: shop.address1 ? shop.address1 : '',
            address2: shop.address2 ? shop.address2 : '',
            city: shop.city ? shop.city : '',
            country: shop.country_code ? shop.country_code : '',
            state: shop.province_code ? shop.province_code : '',
            zipCode: shop.zip ? shop.zip : '',
            name: shop.name ? shop.name : '',
            senderEmail: shop.customer_email ? shop.customer_email : '',
            senderName: shop.name ? shop.name : '',
            storeAbout: '',
            storeId: store.id,
          });
        }

        const shopify = await this.shopifyService.getShopifyWithStoreId(
          store.id,
        );
        const src = new URL(
          `${FRONTEND_HOST_PROTOCOL}//${FRONTEND_HOST}/js/bespoke.global.js`,
        );
        src.searchParams.set(
          'businessId',
          `${shopify?.integration.store?.shortId}`,
        );
        const scripTags = await gqlClient.query({
          data: {
            query: GET_SCRIPTS_TAGS_QUERY,
            variables: {
              src,
            } as GetScriptTagsQueryVariables,
          },
        });

        const tags = scripTags.body as { data: GetScriptTagsQuery };

        if (
          !tags.data.scriptTags.edges ||
          tags.data.scriptTags.edges.length === 0
        ) {
          await gqlClient.query({
            data: {
              query: SCRIPT_TAG_CREATE,
              variables: {
                input: {
                  cache: false,
                  displayScope: 'ONLINE_STORE',
                  src,
                },
              } as { input: ScriptTagInput },
            },
          });
        }

        if (shopify?.authenticated) {
          await this.shopifyService.removeShopifyIntegration(shopify.id);
        }

        const updatedShopify =
          await this.integrationService.addShopifyIntegration(
            store.id,
            session.shop,
          );

        if (!updatedShopify) throw new Error();

        if (storeWasCreated) {
          const checkoutList = await this.listService.createNewList(
            'Checkout',
            store.id,
          );

          if (checkoutList) {
            await this.shopifyService.collectEmailSubscribers(
              updatedShopify?.id,
              checkoutList.id,
            );
          }
        }

        await this.shopifyService.authenticateShopifyIntegration(session.shop);
        await this.storeService.syncShopifyProducts(updatedShopify?.id);
        return await this.validRedirect(req, res, user.id);
      } catch (err) {
        console.log('err', err);

        client.delete({
          path: '/admin/api_permissions/current.json',
        });

        await this.shopifySessionStorage.deleteSession(session.id);

        if (
          err instanceof Error &&
          err.message === 'invalid billing entity' &&
          shopify?.integration.store.subdomain
        ) {
          return res.redirect(
            `${FRONTEND_HOST_PROTOCOL}//${shopify?.integration.store.subdomain}.${FRONTEND_HOST}/integrations/shopify?error=invalidBillingEntity`,
          );
        }

        const data = {
          name: shop.shop_owner ?? '',
          email: shop.email ?? '',
          integration: 'shopify',
        };
        const searchParameters = new URLSearchParams(data);

        return res.redirect(
          `${FRONTEND_HOST_PROTOCOL}//${FRONTEND_HOST}/signup?${searchParameters}`,
        );
      }
    }
  }

  async validRedirect(req: Request, res: Response, userId: string) {
    const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
    const FRONTEND_HOST_PROTOCOL = this.configService.get(
      'FRONTEND_HOST_PROTOCOL',
    );
    //TODO: need to fix this!
    const signed =
      's:' + signature.sign(req.sessionID, process.env.SESSION_SECRET);

    const serializedCookie = cookie.serialize(process.env.COOKIE_NAME, signed, {
      ...req.session.cookie,
      expires: req.session.cookie.expires as undefined,
      secure: req.session.cookie.secure as boolean,
      maxAge: req.session.cookie.originalMaxAge as number,
    });

    const data = {
      integration: 'shopify',
      set_cookie: serializedCookie,
    };

    const searchParameters = new URLSearchParams(data);

    await this.userService.addUserToSession(userId, req);

    return res.redirect(
      `${FRONTEND_HOST_PROTOCOL}//${FRONTEND_HOST}?${searchParameters}`,
    );
  }
}
