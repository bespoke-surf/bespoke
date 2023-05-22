import { FREE_PLAN_ID, PricingIdType } from '@bespoke/common/dist/pricingPlan';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Store } from '../store/store.entity';
import { Billing } from './billing.entity';
import { BillingPlanStatus } from './enum/billingPlanStatus.enum';
import { BillingSubscriptionEntity } from './enum/billingSubscriptionEntity.enum';
import { BillingSubscriptionStatus } from './enum/billingSubscriptionStatus.enum';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepo: Repository<Billing>,
  ) {}

  async createBilling(store: Store): Promise<Billing> {
    const billing = await this.billingRepo.save({
      store,
    });
    return billing;
  }

  async updateSubscriptionId(
    subscriptionId: string,
    billingId: string,
  ): Promise<null> {
    await this.billingRepo.update(billingId, {
      subscriptionId,
    });

    return null;
  }

  async updateCancelAtPeriodEnd(
    cancelAtPeriodEnd: boolean,
    billingId: string,
  ): Promise<null> {
    await this.billingRepo.update(billingId, {
      cancelAtPeriodEnd,
    });

    return null;
  }

  async billingPlanStatus(billing: Billing): Promise<BillingPlanStatus> {
    // active, incomplete and past due is things are still working
    // incomplete_expired, unpaid and cancelled is when we revoke things
    if (
      billing.billingSubscriptionStatus === BillingSubscriptionStatus.ACTIVE
    ) {
      return BillingPlanStatus.ACTIVE;
    } else if (
      billing.billingSubscriptionStatus === BillingSubscriptionStatus.INCOMPLETE
    ) {
      return BillingPlanStatus.PENDING;
    } else if (
      billing.billingSubscriptionStatus === BillingSubscriptionStatus.PAST_DUE
    ) {
      return BillingPlanStatus.PAST_DUE;
    } else if (
      billing.billingSubscriptionStatus ===
      BillingSubscriptionStatus.UNSUBSCRIBED
    ) {
      return BillingPlanStatus.FREE;
    } else {
      return BillingPlanStatus.CANCELLED;
    }
  }

  async getStoreBilling(subdomain: string): Promise<Billing | null> {
    const billing = await this.billingRepo.findOne({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return billing ?? null;
  }
  async getStoreBillingWithSubscriptionId(
    subscriptionId: string,
  ): Promise<Billing | null> {
    const billing = await this.billingRepo.findOne({
      where: {
        subscriptionId,
      },
    });
    return billing ?? null;
  }

  async subscriptionUpdate({
    status,
    currentPeriodEnd,
    bespokePlanId,
    billingId,
    cancelAtPeriodEnd,
    billingSubscriptionEntity,
  }: {
    billingSubscriptionEntity: BillingSubscriptionEntity;
    cancelAtPeriodEnd: boolean;
    status: Stripe.Subscription.Status;
    currentPeriodEnd: number;
    bespokePlanId: PricingIdType;
    billingId: string;
  }): Promise<void> {
    let billingSubscriptionStatus = undefined;

    switch (status) {
      case 'trialing':
        billingSubscriptionStatus = BillingSubscriptionStatus.TRIALING;
        break;
      case 'active':
        billingSubscriptionStatus = BillingSubscriptionStatus.ACTIVE;
        break;
      case 'canceled':
        billingSubscriptionStatus = BillingSubscriptionStatus.CANCELED;
        break;
      case 'incomplete':
        billingSubscriptionStatus = BillingSubscriptionStatus.INCOMPLETE;
        break;
      case 'incomplete_expired':
        billingSubscriptionStatus =
          BillingSubscriptionStatus.INCOMPLETE_EXPIRED;
        break;
      case 'past_due':
        billingSubscriptionStatus = BillingSubscriptionStatus.PAST_DUE;
        break;
      case 'unpaid':
        billingSubscriptionStatus = BillingSubscriptionStatus.UNPAID;
        break;
    }

    if (billingSubscriptionStatus) {
      const date = dayjs.unix(currentPeriodEnd).utc().format();
      await this.billingRepo.update(billingId, {
        currentPeriodEnd: date,
        billingSubscriptionStatus,
        bespokePlanId,
        billingSubscriptionEntity,
      });
    }
    await this.updateCancelAtPeriodEnd(cancelAtPeriodEnd, billingId);
  }

  async cancelCurrentBilling(billingId: string): Promise<boolean> {
    try {
      const billing = await this.billingRepo.findOne({
        where: {
          id: billingId,
        },
      });
      if (
        billing &&
        billing.billingSubscriptionStatus ===
          BillingSubscriptionStatus.UNSUBSCRIBED
      )
        return true;

      const resposne = await this.billingRepo.update(billingId, {
        billingSubscriptionStatus: BillingSubscriptionStatus.CANCELED,
      });
      if (resposne.affected && resposne.affected > 0) {
        return true;
      }
      throw new Error();
    } catch (err) {
      return false;
    }
  }

  async updateBespokePlanId(
    billingId: string,
    newBespokePlanId: PricingIdType,
  ) {
    // not sure if we have to check if its an active plan and only allow updating active plans

    const billing = await this.billingRepo.findOne({
      where: {
        id: billingId,
      },
    });
    if (!billing) throw new Error('missig billing');
    if (
      newBespokePlanId === FREE_PLAN_ID &&
      billing.billingSubscriptionStatus !== BillingSubscriptionStatus.CANCELED
    )
      throw Error('need to be in canceled state');

    await this.billingRepo.update(billingId, {
      bespokePlanId: newBespokePlanId,
    });

    if (newBespokePlanId === FREE_PLAN_ID) {
      await this.billingRepo.update(billingId, {
        billingSubscriptionStatus: BillingSubscriptionStatus.UNSUBSCRIBED,
      });
    }
  }
}
