import {
  Controller,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { BillingService } from '../../billing/billing.service';
import { BillingSubscriptionEntity } from '../../billing/enum/billingSubscriptionEntity.enum';
import { StoreItemService } from '../../store-item/store-item.service';
import { IStripeMetadata, StripeService } from '../../stripe/stripe.service';
import { StoreService } from '../store.service';

@Controller('store')
export class StoreStripeController {
  constructor(
    private readonly stripeService: StripeService,
    private billingService: BillingService,
    @InjectSentry() private readonly sentryClient: SentryService,
    private readonly storeItemServie: StoreItemService, // private readonly storeService: StoreService,
    private readonly storeService: StoreService,
  ) {}

  @Post('stripe-webhook')
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      if (!req.rawBody) throw new Error('raw body missing for strip webhook');
      const event = this.stripeService.constructWebhook(req.rawBody, signature);

      if (event.type === 'customer.subscription.deleted') {
        await this.updateSubscription(event);
      }
      if (event.type === 'customer.subscription.updated') {
        await this.updateSubscription(event);
      }
      if (event.type === 'customer.subscription.created') {
        const subscription = event.data.object as Stripe.Subscription;
        await this.updateSubscription(event);
        await this.billingService.updateSubscriptionId(
          subscription.id,
          subscription.metadata.billingId as string,
        );
      }
      if (event.type === 'invoice.created') {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await this.stripeService.getSubscription(
          invoice.subscription as string,
        );
        const { storeId, bespokePlanId } = this.getMetaData(subscription);

        const quantity = await this.storeService.getUsageQuantity(
          storeId,
          subscription.current_period_start,
        );

        if (!quantity) {
          throw new Error('no exceeded quantity');
        }

        if (!invoice.lines.data[0]?.id) {
          throw new Error('invoice id missing');
        }

        await this.stripeService.createInvoiceItem({
          quantity: quantity,
          customerId: invoice.customer as string,
          invoiceId: invoice.id,
          subscriptionId: subscription.id,
          bespokePlanId,
        });
      }
    } catch (err) {
      console.log(err);

      this.sentryClient.instance().captureException(err);
      if (err instanceof Stripe.errors.StripeError)
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
    } finally {
      res.sendStatus(HttpStatus.OK);
    }
  }

  async updateSubscription(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription;

    const { bespokePlanId, billingId, storeId } =
      this.getMetaData(subscription);
    await this.billingService.subscriptionUpdate({
      billingId,
      bespokePlanId,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      billingSubscriptionEntity: BillingSubscriptionEntity.STRIPE,
    });
    if (subscription.status === 'active') {
      await this.storeItemServie.addSubscriptionRewardItem(storeId);
    }
  }
  getMetaData(subscription: Stripe.Subscription): IStripeMetadata {
    const metadata = subscription.metadata as unknown as IStripeMetadata;
    return metadata;
  }
}
