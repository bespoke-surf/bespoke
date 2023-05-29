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

@Controller('store')
export class StoreStripeController {
  constructor(
    private readonly stripeService: StripeService,
    private billingService: BillingService,
    @InjectSentry() private readonly sentryClient: SentryService,
    private readonly storeItemServie: StoreItemService,
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
      const subscription = event.data.object as Stripe.Subscription;
      const metadata = subscription.metadata as unknown as IStripeMetadata;
      const { bespokePlanId, billingId } = metadata;
      const updateSubscription = async () =>
        await this.billingService.subscriptionUpdate({
          billingId,
          bespokePlanId,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          billingSubscriptionEntity: BillingSubscriptionEntity.STRIPE,
        });
      if (subscription.status === 'active') {
        await this.storeItemServie.addSubscriptionRewardItem(metadata.storeId);
      }
      switch (event.type) {
        case 'customer.subscription.deleted':
          await updateSubscription();
          break;
        case 'customer.subscription.updated':
          await updateSubscription();
          break;
        case 'customer.subscription.created':
          await updateSubscription();
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
