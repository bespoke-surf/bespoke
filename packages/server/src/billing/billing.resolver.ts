import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';
import { BillingPlanStatus } from './enum/billingPlanStatus.enum';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(private billingService: BillingService) {}

  @ResolveField()
  billingPlanStatus(@Parent() billing: Billing): Promise<BillingPlanStatus> {
    return this.billingService.billingPlanStatus(billing);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Billing, {
    nullable: true,
  })
  async getStoreBilling(
    @Args('subdomain') subdomain: string,
  ): Promise<Billing | null> {
    return this.billingService.getStoreBilling(subdomain);
  }
}
