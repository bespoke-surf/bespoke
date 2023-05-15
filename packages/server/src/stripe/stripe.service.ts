import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import dayjs from 'dayjs';
import { Stripe } from 'stripe';
import invariant from 'tiny-invariant';
import { EnvironmentVariables } from '../types';
import { CreateCheckoutSessionInput } from './dto/createCheckoutSessionInput';

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

  async createCheckoutSession(
    input: CreateCheckoutSessionInput,
  ): Promise<string | null> {
    try {
      const { storeId, billingId } = input;

      const priceIdMonthly = this.configService.get(
        'STRIPE_PRICE_ID_BESPOKE_EMAIL_MONTHLY',
      );

      invariant(
        typeof priceIdMonthly === 'string',
        'STRIPE_PRICE_ID_BESPOKE_EMAIL_MONTHLY missing',
      );

      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );

      const session = await this.stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        metadata: {
          storeId,
          billingId,
        },
        line_items: [
          {
            price: priceIdMonthly,
            quantity: input.contactQuantity,
          },
        ],
        mode: 'subscription',
        customer: input.stripeCustomerId,
        success_url: `${FRONTEND_HOST_PROTOCOL}//${input.subdomain}.${FRONTEND_HOST}/plans/success`,
        cancel_url: `${FRONTEND_HOST_PROTOCOL}//${input.subdomain}.${FRONTEND_HOST}/plans/choose`,
        allow_promotion_codes: true,
        subscription_data: {
          metadata: {
            storeId,
            billingId,
          },
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
      name: 'Bespoke Email - Test Clock',
    });
    return testClock;
  }

  customerPortalConfiguration(): Stripe.BillingPortal.ConfigurationCreateParams {
    const stripe_bespoke_email_price_id = this.configService.get(
      'STRIPE_PRICE_ID_BESPOKE_EMAIL_MONTHLY',
    );

    invariant(
      typeof stripe_bespoke_email_price_id === 'string',
      'STRIPE_PRICE_ID_BESPOKE_EMAIL_MONTHLY, is missing',
    );

    const STRIPE_PRODUCT_BESPOKE_EMAIL_ID = this.configService.get(
      'STRIPE_PRODUCT_BESPOKE_EMAIL_ID',
    );

    invariant(
      typeof STRIPE_PRODUCT_BESPOKE_EMAIL_ID === 'string',
      'STRIPE_PRODUCT_BESPOKE_EMAIL_ID, is missing',
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
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['quantity', 'price', 'promotion_code'],
          proration_behavior: 'always_invoice',
          products: [
            {
              prices: [stripe_bespoke_email_price_id],
              product: STRIPE_PRODUCT_BESPOKE_EMAIL_ID,
            },
          ],
        },
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
        headline: 'Bespoke - Helping humanity become financially independent.',
        privacy_policy_url: `https://${FRONTEND_HOST}/privacy-policy`,
        terms_of_service_url: `https://${FRONTEND_HOST}/terms-of-service`,
      },
    };
  }
}
