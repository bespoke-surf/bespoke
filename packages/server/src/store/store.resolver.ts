import { PricingIdType } from '@bespoke/common/dist/pricingPlan';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUserId } from '../decorator/currentUserId';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithList } from '../guard/hasStoreAccessWithList';
import { HasStoreAccessWithPost } from '../guard/hasStoreAccessWithPost';
import { HasStoreAccessWithShopify } from '../guard/hasStoreAccessWithShopify';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { Shopify } from '../shopify/shopify.entity';
import { SignupForm } from '../signup-form/signup-form.entity';
import { Workflow } from '../workflow/workflow.entity';
import { UpdateDisplayPictureInput } from './dto/add-display-picture-input';
import { BenchmarkData } from './dto/benchmarkData';
import { CreateShopifyAppSubscriptionInput } from './dto/createShopifyAppSubscription';
import { CreateSignupFormInput } from './dto/createSignupForm';
import { GetStoreEmailMetric } from './dto/getStoreEmailMetric';
import { UpdateStoreDetailsInput } from './dto/update-store-details';
import { ContactLimitStatus } from './enum/contactLimitStatus.enum';
import { StoreCurrency } from './enum/currency.enum';
import { EmailSentLimitStatus } from './enum/emailSentLimitStatus.enum';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { GettingStartedResponse } from './types/gettingStartedResponse';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @ResolveField()
  async userId(
    @Parent() parent: Store,
    @CurrentUserId() userId: string | undefined,
  ): Promise<string | null> {
    const confirm = await this.storeService.confirmStoreIsUsers(parent, userId);
    if (confirm && userId) {
      return userId;
    }
    return null;
  }

  @ResolveField()
  async contactLimitStatus(
    @Parent() parent: Store,
  ): Promise<ContactLimitStatus> {
    return this.storeService.getContactLimitStatus(parent);
  }

  @ResolveField()
  async emailSentLimitStatus(
    @Parent() store: Store,
  ): Promise<EmailSentLimitStatus> {
    return this.storeService.getEmailSentLimitStatus(store);
  }

  @ResolveField()
  async defaultListIdToCollectEmail(
    @Parent() parent: Store,
  ): Promise<string | null> {
    return this.storeService.getDefaultListToCollectEmail(parent);
  }

  @Query(() => [Store], {
    nullable: true,
    description: 'get all stores for sitemap',
  })
  getAllStoresForSiteMap(): Promise<Store[] | null> {
    return this.storeService.getAllStoresForSiteMap();
  }

  @Query(() => Boolean, {
    nullable: true,
    description: 'check user onboarded',
  })
  @UseGuards(AuthGuard)
  checkUserOnboarded(@CurrentUserId() userId: string): Promise<boolean> {
    return this.storeService.checkUserOnboarded(userId);
  }

  @Query(() => Store, {
    nullable: true,
    description: 'get store with store name',
  })
  getStoreWithSubdomain(
    @Args('subdomain') subdomain: string,
  ): Promise<Store | null> {
    return this.storeService.getStoreWithSubdomain(subdomain);
  }

  @UseGuards(AuthGuard)
  @Query(() => Store, {
    nullable: true,
    description: 'get user store',
  })
  getUserStore(@CurrentUserId() userId: string): Promise<Store | null> {
    return this.storeService.getUserStore(userId);
  }

  @Query(() => Boolean, {
    description: 'Check subdomain available',
  })
  @UseGuards(AuthGuard)
  subdomainAvailable(@Args('subdomain') subdomain: string): Promise<boolean> {
    return this.storeService.subdomainAvailable(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Store, {
    description: 'update the store currency',
  })
  updateStoreCurrency(
    @Args('storeId') storeId: string,
    @Args('currency', { type: () => StoreCurrency }) currency: StoreCurrency,
  ): Promise<Store | null> {
    return this.storeService.updateStoreCurrency(storeId, currency);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Store, {
    nullable: true,
    description: 'update store details',
  })
  updateStoreDetails(
    @Args('input')
    updateStoreDetails: UpdateStoreDetailsInput,
  ): Promise<Store | null> {
    return this.storeService.updateStoreDetails(updateStoreDetails);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Store, {
    nullable: true,
    description: 'update display picture',
  })
  updateDisplayPicture(
    @Args('input')
    input: UpdateDisplayPictureInput,
  ): Promise<Store | null> {
    return this.storeService.updateDisplayPicture(input);
  }

  @UseGuards(AuthGuard, HasStoreAccess, HasStoreAccessWithList)
  @Mutation(() => Store, {
    nullable: true,
    description: 'update default listid ot collect email',
  })
  updateDefaultListIdToCollectEmail(
    @Args('storeId')
    storeId: string,
    @Args('listId')
    listId: string,
  ): Promise<Store | null> {
    return this.storeService.updateDefaultListIdToCollectEmail(storeId, listId);
  }

  @Mutation(() => Boolean, {
    description: 'publish post here',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithPost, HasStoreAccessWithList)
  async publishPostToList(
    @Args('postId') postId: string,
    @Args('listId') listId: string,
    @Args('postHandle') postHandle: string,
  ): Promise<boolean> {
    return this.storeService.publishPostToList({ listId, postId, postHandle });
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'remove shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  syncShopifyProducts(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<null> {
    return this.storeService.syncShopifyProducts(shopifyId);
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'add shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  stopShopifyProductSync(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<Shopify | null> {
    return this.storeService.stopShopifyProductSync(shopifyId, true);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => String, {
    nullable: true,
    description: 'create checkout session url',
  })
  createCheckoutSessionUrl(
    @Args('subdomain')
    subdomain: string,
    @Args('bespokePlanId')
    bespokePlanId: PricingIdType,
  ): Promise<string | null> {
    return this.storeService.createCheckoutSessionUrl(subdomain, bespokePlanId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => String, {
    nullable: true,
    description: 'customer portal session',
  })
  getCustomerPortalSession(
    @Args('subdomain')
    subdomain: string,
  ): Promise<string | null> {
    return this.storeService.getCustomerPortalSession(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  @Mutation(() => Boolean, {
    description: 'publish post here',
  })
  async publishPostHere(
    @Args('postId') postId: string,
    @Args('postHandle') postHandle: string,
  ): Promise<boolean> {
    return this.storeService.publishPostHere(postId, postHandle);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Boolean, {
    description: 'check able to send email to list',
  })
  async checkAbleToSendEmailToList(
    @Args('listId') listId: string,
    @Args('subdomain') subdomain: string,
  ): Promise<boolean> {
    return this.storeService.checkAbleToSendEmailToList(listId, subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => String, {
    nullable: true,
    description: 'create shopify app subscription',
  })
  async createShopifyAppSubscription(
    @Args('input') input: CreateShopifyAppSubscriptionInput,
  ): Promise<string | null> {
    return this.storeService.createShopifyAppSubscription(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => Boolean, {
    nullable: true,
    description: 'cancle the shopify app subscription',
  })
  async shopifyAppSubscriptionCancel(
    @Args('subdomain') subdomain: string,
  ): Promise<boolean> {
    return this.storeService.shopifyAppSubscriptionCancel(subdomain);
  }
  @Mutation(() => Boolean, {
    nullable: true,
  })
  syncScript() {
    return this.storeService.syncScript();
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int)
  getStoreCredits(@Args('subdomain') subdomain: string): Promise<number> {
    return this.storeService.getStoreCredits(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get subscriber revenue',
  })
  getStoreRevenue(@Args('subdomain') subdomain: string): Promise<number> {
    return this.storeService.getStoreRevenue(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get subscriber revenue',
  })
  getStoreDailyRevenueTrend(
    @Args('subdomain') subdomain: string,
  ): Promise<number> {
    return this.storeService.getStoreDailyRevenueTrend(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => GetStoreEmailMetric, {
    nullable: true,
    description: 'get subscriber revenue',
  })
  getStoreEmailMetric(
    @Args('subdomain') subdomain: string,
  ): Promise<GetStoreEmailMetric | null> {
    return this.storeService.getStoreEmailMetrics(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [BenchmarkData], {
    nullable: true,
    description: 'get benchmark data',
  })
  getBenchmarkData(
    @Args('subdomain') subdomain: string,
  ): Promise<BenchmarkData[] | null> {
    return this.storeService.getBenchmarkData(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => Boolean, {
    nullable: true,
    description: 'prorate stripe subscription',
  })
  prorateStripeSubscription(
    @Args('subdomain') subdomain: string,
    @Args('newBespokePlanId') id: string,
  ): Promise<boolean> {
    return this.storeService.prorateStripeSubscription(subdomain, id);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => Boolean, {
    nullable: true,
    description: 'update billing plan to free',
  })
  updateBillingPlanToFree(
    @Args('subdomain') subdomain: string,
  ): Promise<boolean> {
    return this.storeService.updateBillingPlanToFree(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => SignupForm, {
    nullable: true,
    description: 'check signup form',
  })
  createSignupForm(
    @Args('input') input: CreateSignupFormInput,
  ): Promise<SignupForm | null> {
    return this.storeService.createSignupForm(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'create workflows',
  })
  createWorkflow(
    @Args('subdomain') subdoamin: string,
  ): Promise<Workflow | null> {
    return this.storeService.createWorkflow(subdoamin);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [GettingStartedResponse], {
    nullable: true,
    description: 'getting started',
  })
  gettingStarted(
    @Args('subdomain') subdoamin: string,
  ): Promise<GettingStartedResponse[] | null> {
    return this.storeService.gettingStarted(subdoamin);
  }
}
