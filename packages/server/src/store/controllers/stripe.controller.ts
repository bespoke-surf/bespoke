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
import { StripeService } from '../../stripe/stripe.service';

@Controller('store')
export class StoreStripeController {
  constructor(
    private readonly stripeService: StripeService,
    private billingService: BillingService,
    @InjectSentry() private readonly sentryClient: SentryService,
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
      let subscription: Stripe.Subscription;
      switch (event.type) {
        case 'customer.subscription.deleted':
          subscription = event.data.object as Stripe.Subscription;
          await this.billingService.subscriptionUpdate({
            billingId: subscription.metadata.billingId as string,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            quantity: subscription.items.data[0]?.quantity as number,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            billingSubscriptionEntity: BillingSubscriptionEntity.STRIPE,
          });
          break;
        case 'customer.subscription.updated':
          subscription = event.data.object as Stripe.Subscription;
          await this.billingService.subscriptionUpdate({
            billingId: subscription.metadata.billingId as string,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            quantity: subscription.items.data[0]?.quantity as number,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            billingSubscriptionEntity: BillingSubscriptionEntity.STRIPE,
          });
          break;
        case 'customer.subscription.created':
          subscription = event.data.object as Stripe.Subscription;
          await this.billingService.subscriptionUpdate({
            billingId: subscription.metadata.billingId as string,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            quantity: subscription.items.data[0]?.quantity as number,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            billingSubscriptionEntity: BillingSubscriptionEntity.STRIPE,
          });
          await this.billingService.updateSubscriptionId(
            subscription.id,
            subscription.metadata.billingId as string,
          );
          break;
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
}
