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
    quantity,
    billingId,
    cancelAtPeriodEnd,
    billingSubscriptionEntity,
  }: {
    billingSubscriptionEntity: BillingSubscriptionEntity;
    cancelAtPeriodEnd: boolean;
    status: Stripe.Subscription.Status;
    currentPeriodEnd: number;
    quantity: number;
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
      await this.updateBillingSubscription({
        currentPeriodEnd,
        quantity,
        billingSubscriptionStatus,
        billingId,
        billingSubscriptionEntity,
      });
    }
    await this.updateCancelAtPeriodEnd(cancelAtPeriodEnd, billingId);
  }

  async updateBillingSubscription({
    billingId,
    quantity,
    currentPeriodEnd,
    billingSubscriptionStatus,
    billingSubscriptionEntity,
  }: {
    billingId: string;
    quantity: number;
    currentPeriodEnd: number;
    billingSubscriptionStatus: BillingSubscriptionStatus;
    billingSubscriptionEntity: BillingSubscriptionEntity;
  }): Promise<null> {
    const date = dayjs.unix(currentPeriodEnd).utc().format();
    let contactsQuantity = 250;

    const till_500_start = 500;
    const till_500_end = 13500;

    const till_5000_start = 15000;
    const till_5000_end = 150000;

    if (quantity <= 250) {
      contactsQuantity = 250;
    } else if (quantity > 250 && quantity <= 500) {
      contactsQuantity = 500;
    } else if (quantity > 3500 && quantity <= 5000) {
      contactsQuantity = 5000;
    } else if (quantity > 13500 && quantity <= 15000) {
      contactsQuantity = 15000;
    } else if (quantity > 25000 && quantity <= 26000) {
      contactsQuantity = 26000;
    } else if (quantity > 26000 && quantity <= 27000) {
      contactsQuantity = 27000;
    } else if (quantity > 27000 && quantity <= 28000) {
      contactsQuantity = 28000;
    } else if (quantity > 28000 && quantity <= 30000) {
      contactsQuantity = 30000;
    } else if (quantity > till_500_start && quantity <= till_500_end) {
      for (let i = till_500_start; i <= till_500_end; i += 500) {
        if (quantity > i && quantity <= i + 500) {
          contactsQuantity = i + 500;
        }
      }
    } else if (quantity > till_5000_start && quantity <= till_5000_end) {
      for (let i = till_5000_start; i <= till_5000_end; i += 5000) {
        if (quantity > i && quantity <= i + 5000) {
          contactsQuantity = i + 5000;
        }
        if (quantity === i) {
          contactsQuantity = i;
        }
      }
    } else if (quantity > till_5000_end) {
      contactsQuantity = quantity;
    }

    await this.billingRepo.update(billingId, {
      currentPeriodEnd: date,
      billingSubscriptionStatus,
      contactsQuantity,
      emailSendQuantity: contactsQuantity * 10,
      billingSubscriptionEntity,
    });
    return null;
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
}
