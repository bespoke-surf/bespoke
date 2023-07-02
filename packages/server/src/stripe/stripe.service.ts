import {
  PricingIdType,
  bespokePricingPlan,
} from '@bespoke/common/dist/pricingPlan';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Stripe } from 'stripe';
import invariant from 'tiny-invariant';
import { SHORT_TAG_LINE } from '../constants';
import { EnvironmentVariables } from '../types';

export interface IStripeMetadata {
  storeId: string;
  billingId: string;
  bespokePlanId: PricingIdType;
}
@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {
    const stripKey = configService.get('STRIPE_SECRET_KEY');
    invariant(typeof stripKey === 'string', 'STRIPE_SECRET_KEY missing');
    this.stripe = new Stripe(stripKey, {
      apiVersion: '2022-11-15',
      typescript: true,
    });
  }

  constructWebhook(rawBody: Buffer, signature: string): Stripe.Event {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    invariant(
      typeof webhookSecret === 'string',
      'STRIPE_WEBHOOK_SECRET missing',
    );

    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
    return event;
  }

  async createCustomer(
    name: string,
    email: string,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    const NODE_ENV = this.configService.get('NODE_ENV');
    invariant(typeof NODE_ENV === 'string', 'NODE_ENV missing');

    let testClock: string | undefined = undefined;

    if (NODE_ENV === 'development') {
      const clock = await this.createTestClock();
      testClock = clock.id;
    }

    const customer = this.stripe.customers.create({
      name,
      email,
      test_clock: testClock,
    });

    return customer;
  }

  async createCheckoutSession({
    bespokePlanId,
    billingId,
    storeId,
    stripeCustomerId,
    subdomain,
  }: {
    storeId: string;
    billingId: string;
    bespokePlanId: PricingIdType;
    stripeCustomerId: string;
    subdomain: string;
  }): Promise<string | null> {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );

      if (bespokePlanId === 'OPEN_SOURCE' || bespokePlanId === 'FREE')
        return null;

      const stripePriceId = this.configService.get(
        `${bespokePlanId}_STRIPE_PRICE_ID`,
      ) as string;

      console.log({ stripePriceId });

      const session = await this.stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        metadata: {
          storeId,
          billingId,
          bespokePlanId,
        } satisfies IStripeMetadata,
        line_items: [
          {
            price: stripePriceId,
          },
        ],
        mode: 'subscription',
        customer: stripeCustomerId,
        success_url: `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/plan/success`,
        cancel_url: `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/plan/choose`,
        allow_promotion_codes: true,
        subscription_data: {
          metadata: {
            storeId,
            billingId,
            bespokePlanId,
          } satisfies IStripeMetadata,
        },
      });
      return session.url;
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
      return null;
    }
  }

  async createCustomerPortalSession(
    subdomain: string,
    stripeCustomerId: string,
  ): Promise<string | null> {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );

      let configId: string | null = null;

      const configurations =
        await this.stripe.billingPortal.configurations.list({
          limit: 3,
          active: true,
          is_default: true,
        });

      if (configurations.data.length > 0 && configurations.data[0]) {
        const config = await this.stripe.billingPortal.configurations.update(
          configurations.data[0].id,
          this.customerPortalConfiguration(),
        );
        configId = config.id;
      } else {
        const config = await this.stripe.billingPortal.configurations.create(
          this.customerPortalConfiguration(),
        );
        configId = config.id;
      }

      if (!configId) return null;

      const portalSession = await this.stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/dashboard`,
        configuration: configId,
      });

      return portalSession.url;
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
      return null;
    }
  }

  async createTestClock(): Promise<
    Stripe.Response<Stripe.TestHelpers.TestClock>
  > {
    const testClock = await this.stripe.testHelpers.testClocks.create({
      frozen_time: dayjs().unix(),
      name: 'Bespoke - Test Clock',
    });
    return testClock;
  }

  customerPortalConfiguration(): Stripe.BillingPortal.ConfigurationCreateParams {
    const STRIPE_BASIC_PRODUCT_ID = this.configService.get(
      'STRIPE_BASIC_PRODUCT_ID',
    );

    invariant(
      typeof STRIPE_BASIC_PRODUCT_ID === 'string',
      'STRIPE_BASIC_PRODUCT_ID, is missing',
    );

    const STRIPE_ADVANCED_PRODUCT_ID = this.configService.get(
      'STRIPE_ADVANCED_PRODUCT_ID',
    );

    invariant(
      typeof STRIPE_ADVANCED_PRODUCT_ID === 'string',
      'STRIPE_ADVANCED_PRODUCT_ID, is missing',
    );

    const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');

    invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST is missing');

    return {
      features: {
        customer_update: {
          allowed_updates: ['address', 'phone'],
          enabled: true,
        },
        invoice_history: { enabled: true },
        payment_method_update: { enabled: true },
        subscription_pause: {
          enabled: false,
        },
        // subscription_update: {
        //   enabled: false,
        //   default_allowed_updates: ['quantity', 'price', 'promotion_code'],
        //   proration_behavior: 'create_prorations',
        //   products: [
        //     {
        //       prices: [
        //         'price_1NA9YZGuTUZZ6Si6J6vc9tHa',
        //         'price_1NA9YZGuTUZZ6Si66Ks2QAuj',
        //       ],
        //       product: 'prod_Nw1bDRqLZaren6',
        //     },
        //   ],
        // },
        subscription_cancel: {
          mode: 'at_period_end',
          proration_behavior: 'none',
          enabled: true,
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other',
              'customer_service',
              'too_complex',
              'low_quality',
            ],
          },
        },
      },
      business_profile: {
        headline: `Bespoke - ${SHORT_TAG_LINE}`,
        privacy_policy_url: `https://${FRONTEND_HOST}/privacy-policy`,
        terms_of_service_url: `https://${FRONTEND_HOST}/terms-of-service`,
      },
    } satisfies Stripe.BillingPortal.ConfigurationCreateParams;
  }

  async prorateSubscirption({
    subscriptionId,
    newStripePriceId,
    bespokePlanId,
    billingId,
    storeId,
  }: {
    subscriptionId: string;
    newStripePriceId: string;
    bespokePlanId: PricingIdType;
    billingId: string;
    storeId: string;
  }): Promise<string | null> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(
        subscriptionId,
      );
      const updated = await this.stripe.subscriptions.update(subscription.id, {
        proration_behavior: 'create_prorations',
        items: [
          {
            id: subscription.items.data[0]?.id,
            price: newStripePriceId,
          },
        ],
        metadata: {
          bespokePlanId,
          billingId,
          storeId,
        } satisfies IStripeMetadata,
      });
      console.log({ updated });
      return null;
    } catch (err) {
      console.log(err);
      throw new Error('stripe proration failed');
    }
  }

  async createUsageRecords({
    usageQuantity,
    subscriptionId,
    timestamp,
  }: {
    subscriptionId: string;
    usageQuantity: number;
    timestamp: number;
  }) {
    const subscription = await this.stripe.subscriptions.retrieve(
      subscriptionId,
    );
    const idempotencyKey = nanoid();

    console.log(JSON.stringify(subscription));
    const subItemId = subscription.items.data[0]?.id;
    if (!subItemId) throw new Error('subscription item id is missing');

    console.log({ subItemId, usageQuantity, timestamp, idempotencyKey });

    await this.stripe.subscriptionItems.createUsageRecord(
      subItemId,
      {
        quantity: usageQuantity,
        timestamp,
        action: 'increment',
      },
      {
        idempotencyKey,
      },
    );
  }
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  async createInvoiceItem({
    invoiceId,
    quantity,
    bespokePlanId,
    customerId,
    subscriptionId,
  }: {
    invoiceId: string;
    bespokePlanId: string;
    quantity: number;
    customerId: string;
    subscriptionId: string;
  }) {
    const bespokePlan = bespokePricingPlan.find(
      ({ id }) => id === bespokePlanId,
    );
    if (!bespokePlan) throw new Error('Missing bespoke plan');
    await this.stripe.invoiceItems.create({
      customer: customerId,
      unit_amount_decimal: String(bespokePlan.overages * 100),
      quantity,
      invoice: invoiceId,
      subscription: subscriptionId,
      description: `${bespokePlan.contacts + 1} and above`,
    });
  }
}
