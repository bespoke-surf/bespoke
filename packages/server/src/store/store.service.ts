import { pricingPlan } from '@bespoke/common/dist/pricingPlan';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Session, Shopify as ShopifyApi } from '@shopify/shopify-api';
import { Queue } from 'bull';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Redis } from 'ioredis';
import { nanoid } from 'nanoid';
import invariant from 'tiny-invariant';
import { Repository } from 'typeorm';
import {
  AppSubscriptionCancelMutation,
  AppSubscriptionCancelMutationVariables,
  AppSubscriptionCreateMutation,
  AppSubscriptionCreateMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  GetScriptTagsQuery,
  ScriptTagDeleteMutation,
  ScriptTagDeleteMutationVariables,
  ScriptTagInput,
} from '../../__generated__/shopify-types';
import { APP_SUBSCRIPTION_CANCEL } from '../../graphql/appSubscriptionCancel.graphql';
import { APP_SUBSCRIPTIONS_CREATE } from '../../graphql/appSubscriptionCreate.graphql';
import { SCRIPT_TAG_DELETE } from '../../graphql/deleteScriptTag.graphql';
import { GET_SCRIPTS_TAGS_QUERY } from '../../graphql/getScriptTags.graphql';
import { GET_PRODUCT_QUERY } from '../../graphql/product.graphql';
import { SCRIPT_TAG_CREATE } from '../../graphql/scriptags.graphql';
import { AboutService } from '../about/about.service';
import { BillingService } from '../billing/billing.service';
import { BillingPlanStatus } from '../billing/enum/billingPlanStatus.enum';
import {
  APP_SUBSCRIPTON_QUANTITY_PREFIX,
  STORE_DIALY_CRON_QUEUE,
  STORE_PRODUCT_UPLOAD_QUEUE,
  STORE_QUARTERLY_CRON_QUEUE,
  STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE,
  STORE_WEEKLY_CRON_QUEUE,
} from '../constants';
import { CreditService } from '../credit/credit.service';
import { IntegrationService } from '../integration/integration.service';
import { ListService } from '../list/list.service';
import { MetricTypeEnum } from '../metric/enum/metric-type.enum';
import { MetricService } from '../metric/metirc.service';
import { Metric } from '../metric/metric.entity';
import { NotificationService } from '../notification/notification.service';
import { PostListService } from '../post-list/post-list.service';
import { PostStateEnum } from '../post/enum/postStateEnum';
import { PostService } from '../post/post.service';
import { ProductImageInput } from '../product/dto/productImageInput';
import { CDNType } from '../product/enum/cdnType.enum';
import { ProductSource } from '../product/enum/productSource.enum';
import { ProductType } from '../product/enum/productType.enum';
import { ProductService } from '../product/product.service';
import { ShopifyProductData } from '../product/type/shopifyProductData';
import { QuestType } from '../quest/enum/questType.enum';
import { ShopifySessionStorage } from '../session/shopifySessionStorage';
import { Shopify } from '../shopify/shopify.entity';
import { ShopifyService } from '../shopify/shopify.service';
import { SignupForm } from '../signup-form/signup-form.entity';
import { SignupFormService } from '../signup-form/signup-form.service';
import { StoreChallenge } from '../store-challenge/storeChallenge.entity';
import { StoreChallengeService } from '../store-challenge/storeChallenge.service';
import { StripeService } from '../stripe/stripe.service';
import { SubscriberListService } from '../subscriber-list/subscriber-list.service';
import { Subscriber } from '../subscriber/subscriber.entity';
import { SubscriberService } from '../subscriber/subscriber.service';
import { EnvironmentVariables } from '../types';
import { User } from '../user/user.entity';
import { DAYJS_TIMESTAMPZ_FORMAT } from '../utils/constants';
import { isReservedSubdomain } from '../utils/reservedSubdomain';
import { WorkflowStateConditionalSplitActivityValue } from '../workflow-state/type/stateConditionalSplitValue';
import { WorkflowStateTriggerSplitActivityValue } from '../workflow-state/type/triggerSplitValues';
import { WorkflowStateService } from '../workflow-state/workflow-state.service';
import { BaseConditionalFilter } from '../workflow/type/baseCoindtionalFilter/baseConditionalFilter';
import { BaseConditionalFilterConditionEnum } from '../workflow/type/baseCoindtionalFilter/enum/condition.enum';
import { BaseTriggerFilter } from '../workflow/type/baseTriggerFilter/baseTriggerFilter';
import { WorkflowService } from '../workflow/workflow.service';
import { UpdateDisplayPictureInput } from './dto/add-display-picture-input';
import { BenchmarkData } from './dto/benchmarkData';
import { CreateShopifyAppSubscriptionInput } from './dto/createShopifyAppSubscription';
import { GetStoreEmailMetric } from './dto/getStoreEmailMetric';
import { PublishPostToListInput } from './dto/publishPostToListInput';
import { StoreSendEmailData } from './dto/sendgridSendEmailData';
import { UpdateStoreDetailsInput } from './dto/update-store-details';
import { ContactLimitStatus } from './enum/contactLimitStatus.enum';
import { StoreCurrency } from './enum/currency.enum';
import { EmailSentLimitStatus } from './enum/emailSentLimitStatus.enum';
import { Contact, DisplayPicture, Store } from './store.entity';
dayjs.extend(utc);
@Injectable()
export class StoreService implements OnModuleInit {
  constructor(
    @InjectRepository(Store)
    private storeRepo: Repository<Store>,
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
    @InjectRepository(DisplayPicture)
    private displayPictureRepo: Repository<DisplayPicture>,
    private aboutService: AboutService,
    private postService: PostService,
    private postListService: PostListService,
    private shopifyService: ShopifyService,
    private integrationService: IntegrationService,
    @InjectQueue(STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE)
    private readonly storeSendEmailQueue: Queue<StoreSendEmailData>,
    @InjectQueue(STORE_PRODUCT_UPLOAD_QUEUE)
    private readonly storeProductUploadQueue: Queue,
    @InjectQueue(STORE_DIALY_CRON_QUEUE)
    private readonly storeDailyCronQueue: Queue,
    @InjectQueue(STORE_WEEKLY_CRON_QUEUE)
    private readonly storeWeeklyCronQueue: Queue,
    @InjectQueue(STORE_QUARTERLY_CRON_QUEUE)
    private readonly storeQuarterlyQueue: Queue,
    private metricService: MetricService,
    private workflowService: WorkflowService,
    private subscriberListService: SubscriberListService,
    private signupFormService: SignupFormService,
    private listService: ListService,
    private stripeService: StripeService,
    private billingService: BillingService,
    private notificationService: NotificationService,
    private subscriberService: SubscriberService,
    private productService: ProductService,
    private workflowStateService: WorkflowStateService,
    private storeChallengeService: StoreChallengeService,
    private crediService: CreditService,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService<EnvironmentVariables>,
    @InjectSentry() private readonly sentryClient: SentryService,
    @InjectShopify() private readonly shopifyApi: ShopifyApi,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
    @InjectRedis() private redis: Redis,
  ) {}

  onModuleInit() {
    this.storeDailyCronQueue.add(
      {},
      {
        repeat: {
          cron: CronExpression.EVERY_DAY_AT_MIDNIGHT,
        },
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    this.storeWeeklyCronQueue.add(
      {},
      {
        repeat: {
          cron: CronExpression.EVERY_WEEK,
        },
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    this.storeQuarterlyQueue.add(
      {},
      {
        repeat: {
          cron: CronExpression.EVERY_QUARTER,
        },
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  async emitEvent(eventName: string, storeId: string) {
    const store = await this.storeRepo.findOne({
      where: { id: storeId },
      relations: { user: true },
    });
    this.eventEmitter.emit(eventName, store);
  }

  async confirmStoreIsUsers(
    store: Store,
    userId: string | undefined,
  ): Promise<boolean | null> {
    const storeWitUser = await this.storeRepo.findOne({
      where: { id: store.id },
      relations: { user: true },
    });

    if (storeWitUser?.user.id === userId) {
      return true;
    }

    return false;
  }

  async getDefaultListToCollectEmail(store: Store): Promise<string | null> {
    const list = await this.listService.getStoreDefaultList(store.id);
    return list?.id ?? null;
  }

  async getStore(storeId: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { id: storeId },
      relations: {
        user: true,
      },
    });
    return store;
  }

  async getStoreDetails(storeId: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { id: storeId },
      relations: {
        contact: true,
      },
    });

    return store;
  }

  async getStoreWithSubdomain(subdomain: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { subdomain },
      relations: {
        contact: true,
        displayPicture: true,
        about: true,
      },
    });

    return store;
  }

  async checkUserOnboarded(userId: string): Promise<boolean> {
    const store = await this.storeRepo.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });
    if (store?.subdomain) {
      return true;
    }
    return false;
  }

  async getUserStore(userId: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { user: { id: userId } },
      relations: {
        contact: true,
        about: true,
      },
    });
    return store ?? null;
  }

  async getAllStoresForSiteMap(): Promise<Store[] | null> {
    const store = await this.storeRepo.find({
      relations: { contact: true, displayPicture: true, about: true },
    });
    return store ?? null;
  }

  async subdomainAvailable(subdomain: string): Promise<boolean> {
    if (isReservedSubdomain(subdomain)) {
      return false;
    }
    const doesStoreExist = await this.storeRepo.findOne({
      where: { subdomain },
    });
    return doesStoreExist ? false : true;
  }

  async updateDisplayPicture(
    input: UpdateDisplayPictureInput,
  ): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { id: input.storeId },
      relations: {
        displayPicture: true,
      },
    });

    if (!store?.displayPicture) {
      const displayPicture = await this.displayPictureRepo.save({
        height: input.height,
        width: input.width,
        src: input.url,
      });
      await this.storeRepo.update(input.storeId, {
        displayPicture,
      });
    } else {
      await this.displayPictureRepo.update(store.displayPicture.id, {
        height: input.height,
        width: input.width,
        src: input.url,
      });
    }

    return null;
  }

  // async uploadLimitType(rootStore: Store): Promise<UploadLimitType> {
  //   const store = await prisma.store.findUnique({where:{id:rootStore.id}});
  //   if (!store) return UploadLimitType.ERROR;

  //   const productCount = await this.getProductCount(store.id);

  //   if (productCount === store.planQuantity) {
  //     return UploadLimitType.REACHED;
  //   }
  //   if (productCount > store.planQuantity) {
  //     return UploadLimitType.EXCEEDED;
  //   }
  //   if (productCount < store.planQuantity) {
  //     return UploadLimitType.OK;
  //   }
  //   return UploadLimitType.ERROR;
  // }

  async updateStoreCurrency(
    storeId: string,
    currency: StoreCurrency,
  ): Promise<Store | null> {
    await this.storeRepo.update(storeId, {
      currency,
    });

    return null;
  }

  async createCheckoutSessionUrl(
    subdomain: string,
    contactQuantity: number,
  ): Promise<string | null> {
    try {
      const store = await this.storeRepo.findOne({
        where: {
          subdomain,
        },
        relations: {
          billing: true,
          user: true,
        },
      });
      if (!store || !store.subdomain) return null;

      if (!store.user.stripeCustomerId || !store?.billing?.id) return null;

      return await this.stripeService.createCheckoutSession({
        billingId: store.billing.id,
        contactQuantity,
        storeId: store.id,
        stripeCustomerId: store.user.stripeCustomerId,
        subdomain: store.subdomain,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
      return null;
    }
  }

  async getCustomerPortalSession(subdomain: string): Promise<string | null> {
    const store = await this.storeRepo.findOne({
      where: { subdomain },
      relations: { user: true },
    });
    if (!store?.user.stripeCustomerId) return null;
    return await this.stripeService.createCustomerPortalSession(
      subdomain,
      store?.user.stripeCustomerId,
    );
  }

  async updateStoreDetails(
    input: UpdateStoreDetailsInput,
  ): Promise<Store | null> {
    try {
      const { name, storeAbout, subdomain, storeId, ...rest } = input;

      const storeData = await this.storeRepo.findOne({
        where: { id: storeId },
        relations: { contact: true, about: true },
      });

      if (!storeData) return null;

      // check for subdomain not available first and then update the rest. return null says subdomain not avialable.
      if (subdomain && subdomain !== storeData.subdomain) {
        const available = await this.subdomainAvailable(subdomain);
        if (!available) return null;

        await this.storeRepo.update(storeData.id, {
          subdomain: subdomain,
        });
      }

      await this.storeRepo.update(storeData.id, {
        name: name,
      });

      const contact: Partial<Contact> | undefined = {
        ...rest,
        ...storeData.contact,
      };

      if (contact?.id) {
        await this.contactRepo.update(contact?.id, {
          ...contact,
        });
      } else {
        await this.contactRepo.save({
          ...contact,
          store: storeData,
        });
      }
      if (storeAbout && storeData.about) {
        await this.aboutService.updateAbout({
          about: storeAbout,
          aboutId: storeData.about.id,
        });
      }

      const updatedStore = await this.storeRepo.findOne({
        where: { id: storeData.id },
        relations: { contact: true, displayPicture: true },
      });

      return updatedStore ?? null;
    } catch (error) {
      this.sentryClient.instance().captureException(error);
      return null;
    }
  }

  async getStoreWithIntegration(storeId: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: {
        id: storeId,
      },
      relations: {
        integration: true,
      },
    });
    return store ?? null;
  }

  async updateDefaultListIdToCollectEmail(
    storeId: string,
    listId: string,
  ): Promise<null> {
    await this.listService.updateisDefaultList(listId, storeId);
    return null;
  }

  async checkUsageActivityAllowed(storeId: string): Promise<boolean> {
    try {
      const store = await this.storeRepo.findOne({
        where: {
          id: storeId,
        },
      });
      if (!store) throw new Error();
      const contactLimitStatus = await this.getContactLimitStatus(store);
      if (contactLimitStatus === ContactLimitStatus.DISALLOWED)
        throw new Error();
      return true;
    } catch (err) {
      return false;
    }
  }

  async checkPublishingAllowed(postId: string): Promise<boolean> {
    try {
      const post = await this.postService.getPostWithStoreDetails(postId);
      if (!post) throw new Error();
      const allowed = await this.checkUsageActivityAllowed(post.store.id);
      if (!allowed) throw new Error();
      return true;
    } catch (err) {
      return false;
    }
  }

  async publishPostToList(input: PublishPostToListInput): Promise<boolean> {
    try {
      const { postId } = input;
      if (input.postHandle === '' || !input.postHandle) throw new Error();

      const post = await this.postService.getPostWithStoreDetails(postId);

      if (!post || !post.store.subdomain) throw new Error();

      const hasEnough = await this.checkAbleToSendEmailToList(
        input.listId,
        post.store.subdomain,
      );
      if (!hasEnough) throw new Error();

      const allowed = await this.checkPublishingAllowed(postId);
      if (!allowed) throw new Error();

      const checkAvailable = await this.postService.checkPostHandleAvailable(
        postId,
        input.postHandle,
      );
      if (!checkAvailable) throw new Error();

      if (post.postState !== PostStateEnum.DRAFT) throw new Error();

      await this.postService.publishPost(postId, input.postHandle);
      await this.postListService.createPostList(postId, input.listId);
      const updatedPost = await this.postService.getPostWithStoreDetails(
        postId,
      );
      if (!updatedPost) throw new Error();
      await this.storeSendEmailQueue.add(
        {
          listId: input.listId,
          postData: updatedPost,
        },
        {
          removeOnFail: true,
          removeOnComplete: true,
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async publishPostHere(postId: string, handle: string): Promise<boolean> {
    try {
      const post = await this.postService.getPostWithStoreDetails(postId);
      if (!post) throw new Error();

      const allowed = await this.checkPublishingAllowed(postId);
      if (!allowed) throw new Error();

      if (post?.postState !== PostStateEnum.PUBLISHED) {
        await this.postService.publishPost(post?.id, handle);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async createStore(user: User): Promise<Store> {
    const store = await this.storeRepo.save({
      user,
      shortId: nanoid(6),
    });
    if (store) {
      await this.billingService.createBilling(store);
      await this.notificationService.createNotificationRelation(store);
      await this.aboutService.createAbout(store);
      await this.integrationService.createIntegration(store);
      await this.listService.createNewList('Newsletter', store.id);
    }

    return store;
  }

  async syncShopifyProducts(shopifyId: string): Promise<null> {
    const shopify = await this.shopifyService.getShopify(shopifyId);

    if (!shopify) return null;

    const offlineId = this.shopifyApi.session.getOfflineId(shopify.storeUrl);
    const session = await this.shopifySessionStorage.loadSession(offlineId);

    const jobId = nanoid();
    await this.storeProductUploadQueue.add(session, {
      jobId,
      removeOnFail: true,
      removeOnComplete: true,
    });

    return null;
  }

  // this is used int the fronend when stopJobId is passed the job gets stopped
  async stopShopifyProductSync(
    shopifyId: string,
    stopJob?: boolean,
  ): Promise<Shopify | null> {
    const shopify = await this.shopifyService.getShopify(shopifyId);
    if (!shopify) return null;

    const jobId = shopify.productSyncJobId;

    await this.shopifyService.removedProductSyncJobId(shopify.id);

    if (!jobId) return null;

    const job = await this.storeProductUploadQueue.getJob(jobId);
    if (!job) return null;

    if (stopJob) {
      job.moveToFailed({ message: 'Job stopped manualy' }, true);
    }

    return null;
  }

  async syncScript(): Promise<void> {
    try {
      const offlineId = this.shopifyApi.session.getOfflineId(
        'bespoke-test-05.myshopify.com',
      );
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (!session) return;

      const gqlClient = new this.shopifyApi.clients.Graphql({
        session: session as Session,
      });

      const src = `https://sour-donuts-buy-103-175-88-112.loca.lt/js/bespoke.global.js?businessId=ZT4Vtx`;

      const scripTags = await gqlClient.query({
        data: {
          query: GET_SCRIPTS_TAGS_QUERY,
        },
      });

      const tags = scripTags.body as { data: GetScriptTagsQuery };

      if (
        tags.data.scriptTags.edges.length !== undefined &&
        tags.data.scriptTags.edges.length > 0
      ) {
        tags.data.scriptTags.edges.forEach(async (edge) => {
          const delted = await gqlClient.query({
            data: {
              query: SCRIPT_TAG_DELETE,
              variables: {
                id: edge.node.id,
              } as ScriptTagDeleteMutationVariables,
            },
          });
          const body = delted.body as { data: ScriptTagDeleteMutation };
          console.log(body.data.scriptTagDelete?.deletedScriptTagId);
        });
      }

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
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  async getStoreWithBusinessId(buisnessId: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: {
        shortId: buisnessId,
      },
    });
    return store;
  }

  async signupformController(businessId: string): Promise<SignupForm[]> {
    try {
      if (!businessId) throw new NotFoundException('businessId missing');
      const store = await this.getStoreWithBusinessId(businessId);
      if (!store) throw new NotFoundException('business not found');
      const forms = await this.signupFormService.getLiveSignupformsWithStoreId(
        store.id,
      );
      if (!forms) throw new NotFoundException('no forms available');

      forms.forEach((form) => {
        this.signupFormService.incremetFormView(form.id);
      });

      return forms;
    } catch (err) {
      console.log(err);
      throw new NotFoundException('forms not found');
    }
  }

  async getContactLimitStatus(store: Store): Promise<ContactLimitStatus> {
    try {
      if (!store.subdomain) throw new Error();
      const billing = await this.billingService.getStoreBilling(
        store.subdomain,
      );

      if (!billing) throw new Error();

      const billingPlanStatus = await this.billingService.billingPlanStatus(
        billing,
      );

      if (
        billingPlanStatus === BillingPlanStatus.CANCELLED ||
        billingPlanStatus === BillingPlanStatus.PENDING
      ) {
        throw new Error();
      }

      const subscriberCount = await this.subscriberService.getSubscribersCount(
        store.subdomain,
      );

      const percent =
        (subscriberCount / (billing?.contactsQuantity ?? 1)) * 100;

      // we need to do this check because if contactquantity can have a value event if the billing status is cancelled

      if (percent >= 95 && percent < 100) {
        return ContactLimitStatus.BRINK_OF_DISSALWOED;
      }
      if (percent < 95) {
        return ContactLimitStatus.ALLOWED;
      }
      throw new Error();
    } catch (err) {
      return ContactLimitStatus.DISALLOWED;
    }
  }

  async getEmailSentLimitStatus(store: Store): Promise<EmailSentLimitStatus> {
    try {
      if (!store.subdomain) throw new Error();
      const billing = await this.billingService.getStoreBilling(
        store.subdomain,
      );

      if (!billing) throw new Error();

      const billingPlanStatus = await this.billingService.billingPlanStatus(
        billing,
      );

      if (
        billingPlanStatus === BillingPlanStatus.CANCELLED ||
        billingPlanStatus === BillingPlanStatus.FREE ||
        billingPlanStatus === BillingPlanStatus.PENDING
      ) {
        throw new Error();
      }

      const emailSentThisMonth =
        await this.metricService.getEmailSentThisMonthCount(store.subdomain);

      const sentQuantity = billing.emailSendQuantity;

      if (!sentQuantity) return EmailSentLimitStatus.DISALLOWED;

      const percent = (emailSentThisMonth / sentQuantity) * 100;

      if (percent >= 95 && percent < 100) {
        return EmailSentLimitStatus.BRINK_OF_DISSALWOED;
      }

      if (percent < 95) {
        return EmailSentLimitStatus.ALLOWED;
      }
      throw new Error();
    } catch (err) {
      return EmailSentLimitStatus.DISALLOWED;
    }
  }

  async checkAbleToSendEmailToList(
    listId: string,
    subdomain: string,
  ): Promise<boolean> {
    const billing = await this.billingService.getStoreBilling(subdomain);

    if (!billing) return false;

    const emailSentThisMonth =
      await this.metricService.getEmailSentThisMonthCount(subdomain);

    const sendingQuantity =
      await this.subscriberListService.getSubscribersInListCount(listId);

    const sendingLimt = billing.emailSendQuantity - emailSentThisMonth;

    if (sendingLimt === 0 || billing.emailSendQuantity === 0) return false;

    if (sendingQuantity <= sendingLimt) {
      return true;
    }

    return false;
  }

  async createShopifyAppSubscription({
    contactQuantity,
    isPremium,
    subdomain,
  }: CreateShopifyAppSubscriptionInput): Promise<string | null> {
    try {
      let pricing: number | undefined = 0;

      const label = `${
        isPremium ? 'Recommended' : 'Pro'
      } plan with ${contactQuantity} contacts and ${
        contactQuantity * 10
      } email sends.`;

      if (contactQuantity * 10 >= 1500010) {
        pricing = Math.ceil(contactQuantity * (pricingPlan.at(-1)?.price ?? 0));
      } else {
        const currentPlan = pricingPlan.find(
          ({ value }) => value === contactQuantity * 10,
        );
        pricing = currentPlan?.price;
      }

      if (pricing === undefined || pricing === 0 || !pricing) {
        throw new Error('prcing undefined');
      }

      const FRONTEND_HOST_PROTOCOL = await this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      const FRONTEND_HOST = await this.configService.get('FRONTEND_HOST');
      const NODE_ENV = await this.configService.get('NODE_ENV');
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST is missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL is missing',
      );
      invariant(typeof NODE_ENV === 'string', 'NODE_ENV is missing');

      const store = await this.storeRepo.findOne({
        where: {
          subdomain,
        },
        relations: {
          integration: {
            shopify: true,
          },
        },
      });

      if (store?.integration?.shopify?.authenticated === false)
        throw new Error('integration false');

      if (!store?.integration?.shopify?.storeUrl) throw new Error('no url');

      const offlineId = this.shopifyApi.session.getOfflineId(
        store?.integration.shopify.storeUrl,
      );
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (!session) throw new Error('session missing');

      const gqlClient = new this.shopifyApi.clients.Graphql({
        session: session as Session,
      });

      const response = await gqlClient.query({
        data: {
          query: APP_SUBSCRIPTIONS_CREATE,
          variables: {
            test: process.env.NODE_ENV === 'production' ? true : true,
            name: label,
            returnUrl: `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/growth-path/success`,
            lineItems: [
              {
                plan: {
                  appRecurringPricingDetails: {
                    price: {
                      amount: pricing - 0.01,
                      currencyCode: 'USD',
                    },
                    interval: 'EVERY_30_DAYS',
                  },
                },
              },
            ],
          } as AppSubscriptionCreateMutationVariables,
        },
      });

      const appSubscriptions = response.body as {
        data: AppSubscriptionCreateMutation;
      };

      if (appSubscriptions.data.appSubscriptionCreate?.appSubscription?.id) {
        this.redis.set(
          `${APP_SUBSCRIPTON_QUANTITY_PREFIX}${appSubscriptions.data.appSubscriptionCreate.appSubscription.id}`,
          contactQuantity,
        );
      }

      if (appSubscriptions.data.appSubscriptionCreate?.confirmationUrl) {
        return appSubscriptions.data.appSubscriptionCreate.confirmationUrl;
      }
      throw new Error('end error');
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
      return null;
    }
  }
  async shopifyAppSubscriptionCancel(subdomain: string): Promise<boolean> {
    try {
      const store = await this.storeRepo.findOne({
        where: {
          subdomain,
        },
        relations: {
          integration: {
            shopify: true,
          },
        },
      });

      if (store?.integration?.shopify?.authenticated === false)
        throw new Error();

      if (!store?.integration?.shopify?.storeUrl) throw new Error();

      if (!store.subdomain) throw new Error();

      const billing = await this.billingService.getStoreBilling(
        store.subdomain,
      );

      if (!billing) throw new Error();

      const offlineId = this.shopifyApi.session.getOfflineId(
        store?.integration.shopify.storeUrl,
      );
      const session = await this.shopifySessionStorage.loadSession(offlineId);

      if (!session) throw new Error();

      const gqlClient = new this.shopifyApi.clients.Graphql({
        session: session as Session,
      });

      const response = await gqlClient.query({
        data: {
          query: APP_SUBSCRIPTION_CANCEL,
          variables: {
            id: billing.subscriptionId,
          } as AppSubscriptionCancelMutationVariables,
        },
      });

      const appSubscriptions = response.body as {
        data: AppSubscriptionCancelMutation;
      };
      if (
        appSubscriptions.data.appSubscriptionCancel?.appSubscription?.status ===
        'CANCELLED'
      ) {
        return true;
      }
      throw new Error();
    } catch (err) {
      return false;
    }
  }
  async checkFlowFilterPermited(
    workflowId: string,
    triggredMetricId: string,
  ): Promise<boolean> {
    const workflow = await this.workflowService.getWorkflow(workflowId);

    if (!workflow?.flowFilter) return true;

    const flowFilter = workflow.flowFilter;

    const filterd = await this.handleFlowFilter(flowFilter, triggredMetricId);
    return filterd;
  }

  async checkConditionalFlowFilterPermited(
    workflowStateId: string,
    triggredMetricId: string,
  ): Promise<boolean> {
    const workflowState = await this.workflowStateService.getWorkflowState(
      workflowStateId,
    );
    const flowFilter = (
      workflowState?.value as WorkflowStateConditionalSplitActivityValue
    ).flowFilter;

    const filterd = await this.handleFlowFilter(flowFilter, triggredMetricId);

    return filterd;
  }

  async handleFlowFilter(
    flowFilter: BaseConditionalFilter[][],
    metricId: string,
  ) {
    let filtered = true;

    // [[a,b],[c,d]]
    // the innter array with value are OR operations
    // the outer array's are AND operations
    for (let i = 0; i < flowFilter.length; i++) {
      const value: Array<boolean> = [];
      const conditonValues = flowFilter[i];
      if (!conditonValues) continue;
      for (let j = 0; j < conditonValues.length; j++) {
        if (
          flowFilter[i]?.[j]?.condition ===
          BaseConditionalFilterConditionEnum.HAS_DONE_OR_NOT_DONE
        ) {
          const filtered =
            await this.metricService.getMetricHasDoneOrNotDoneFilter(
              metricId,
              flowFilter[i]?.[j]?.value?.trigger,
              flowFilter[i]?.[j]?.value?.inequality,
              flowFilter[i]?.[j]?.value?.time,
            );
          value.push(filtered);
        }
      }
      if (value.every((val) => val === false)) {
        filtered = false;
        break;
      }
    }
    return filtered;
  }

  async checkTriggerFilterPermited(
    workflowId: string,
    triggredMetricId: string,
  ): Promise<boolean> {
    const workflow = await this.workflowService.getWorkflow(workflowId);

    if (!workflow?.triggerFilter) return true;

    const triggerFilter = workflow.triggerFilter;

    const filtered = await this.handleTriggerFilter(
      triggerFilter,
      triggredMetricId,
    );

    return filtered;
  }

  async checkTriggerSplitPermited(
    workflowIdStateId: string,
    triggredMetricId: string,
  ): Promise<boolean> {
    const workflowState = await this.workflowStateService.getWorkflowState(
      workflowIdStateId,
    );

    const triggerFilter = (
      workflowState?.value as WorkflowStateTriggerSplitActivityValue
    ).triggerFilter;

    const filtered = await this.handleTriggerFilter(
      triggerFilter,
      triggredMetricId,
    );

    return filtered;
  }

  async handleTriggerFilter(
    triggerFilter: BaseTriggerFilter[][],
    metricId: string,
  ) {
    let filtered = true;

    for (let i = 0; i < triggerFilter.length; i++) {
      const value: Array<boolean> = [];
      const conditonValues = triggerFilter[i];
      if (!conditonValues) continue;
      for (let j = 0; j < conditonValues.length; j++) {
        const filtered = await this.metricService.getMetricTriggerFilter(
          metricId,
          triggerFilter[i]?.[j]?.type,
          triggerFilter[i]?.[j]?.value,
          triggerFilter[i]?.[j]?.dimension,
        );
        value.push(filtered);
      }
      if (value.every((val) => val === false)) {
        filtered = false;
        break;
      }
    }
    return filtered;
  }

  async handleCreateOrUpdateShopifyProduct(shop: string, productId: string) {
    const offlineId = this.shopifyApi.session.getOfflineId(shop);
    const session = await this.shopifySessionStorage.loadSession(offlineId);
    const shopify = await this.shopifyService.getShopifyWithStoreUrl(shop);
    if (!shopify) return;
    if (!session) return;

    const graphqlClient = new this.shopifyApi.clients.Graphql({
      session: session as Session,
    });

    const response = await graphqlClient.query({
      data: {
        query: GET_PRODUCT_QUERY,
        variables: {
          productId,
        } as GetProductQueryVariables,
      },
    });

    const productBody = response.body as { data: GetProductQuery };
    const product = productBody.data.product;
    if (!product) return;

    const { images, ...rest } = product;

    const productExist = await this.productService.getShopifyProductWithId(
      productId,
    );

    const productImage: ProductImageInput[] = [];
    images.edges.map((image) => {
      productImage.push({
        mimeType: 'image/png',
        height: image.node.height ?? 0,
        src: image.node.url,
        width: image.node.width ?? 0,
        cdnType: CDNType.SHOPIFY,
      });
    });
    const productData: ShopifyProductData = {
      ...rest,
    };
    const baseProduct = {
      image: productImage,
      name: product.title,
      price: product.variants.edges[0]?.node.price * 100,
      externalLink: `https://${session.shop}/products/${product?.handle}`,
    };

    if (productExist) {
      await this.productService.updateShopifyProduct(
        { ...baseProduct, id: productExist.id },
        productData,
      );
    } else {
      await this.productService.createShopifyProduct(
        {
          ...baseProduct,
          storeId: shopify.integration.store.id,
          type: ProductType.EXTERNAL_LINK,
          productSource: ProductSource.SHOPIFY,
        },
        productData,
      );
    }
  }

  async getCurrentStoreChallengesByQuestType({
    subdomain,
    questType,
  }: {
    subdomain: string;
    questType: QuestType;
  }): Promise<StoreChallenge[] | null> {
    const store = await this.storeRepo.findOne({
      where: {
        subdomain,
      },
    });

    if (!store) return null;

    const challenges =
      await this.storeChallengeService.getCurrentStoreChallengesByQuestType({
        questType,
        storeId: store.id,
      });

    return challenges;
  }

  async getStoreCredits(subdomain: string): Promise<number> {
    const store = await this.getStoreWithSubdomain(subdomain);

    if (!store) return 0;
    const credits = await this.crediService.getStoreCredis(store.id);
    return credits;
  }

  async getStoreRevenue(subdomain: string): Promise<number> {
    const store = await this.getStoreWithSubdomain(subdomain);
    if (!store) return 0;
    const total = await this.metricService.getPlacedOrderRevenue(store.id);
    return total;
  }

  async getStoreDailyRevenueTrend(subdomain: string): Promise<number> {
    const store = await this.getStoreWithSubdomain(subdomain);
    if (!store) return 0;
    const total = await this.metricService.getDailyRevenueTrend(store.id);
    return total;
  }

  async getStoreEmailMetrics(
    subdomain: string,
  ): Promise<GetStoreEmailMetric | null> {
    const store = await this.getStoreWithSubdomain(subdomain);
    if (!store) return null;

    const yStartDay = new Date(
      dayjs().subtract(-1).startOf('day').format(DAYJS_TIMESTAMPZ_FORMAT),
    );
    const yEndDay = new Date(
      dayjs().subtract(-1).endOf('day').format(DAYJS_TIMESTAMPZ_FORMAT),
    );
    const startDay = new Date(
      dayjs().startOf('day').format(DAYJS_TIMESTAMPZ_FORMAT),
    );
    const endDay = new Date(
      dayjs().endOf('day').format(DAYJS_TIMESTAMPZ_FORMAT),
    );

    const data = await this.storeRepo
      .createQueryBuilder()
      .from(Store, 'store')
      .select('store.id', 'id')
      .groupBy('store.id')
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('COUNT(subscriber.id)', 'contact')
            .from(Subscriber, 'subscriber')
            .where('subscriber.storeId = store.id'),
        'contact',
      )
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'opened')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_OPENED,
          });
        return subquery;
      }, 'opened')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'clicked')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
          });
        return subquery;
      }, 'clicked')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'delivered')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_DELIVERED,
          });
        return subquery;
      }, 'delivered')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'yOpened')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :yStartDay', { yStartDay })
          .andWhere('metric.createdAt <= :yEndDay', { yEndDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_OPENED,
          });
        return subquery;
      }, 'yOpened')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'yClicked')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :yStartDay', { yStartDay })
          .andWhere('metric.createdAt <= :yEndDay', { yEndDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
          });
        return subquery;
      }, 'yClicked')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'yDelivered')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :yStartDay', { yStartDay })
          .andWhere('metric.createdAt <= :yEndDay', { yEndDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_DELIVERED,
          });
        return subquery;
      }, 'yDelivered')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'tOpened')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :startDay', { startDay })
          .andWhere('metric.createdAt <= :endDay', { endDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_OPENED,
          });
        return subquery;
      }, 'tOpened')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'tClicked')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :startDay', { startDay })
          .andWhere('metric.createdAt <= :endDay', { endDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
          });
        return subquery;
      }, 'tClicked')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'tDelivered')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.createdAt >= :startDay', { startDay })
          .andWhere('metric.createdAt <= :endDay', { endDay })
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_DELIVERED,
          });
        return subquery;
      }, 'tDelivered')
      .getRawOne();
    const clickedTrend = Math.ceil(
      (Number(data.tClicked) - Number(data.yClicked)) / 10,
    );
    const openedTrend = Math.ceil(
      (Number(data.tOpened) - Number(data.yOpened)) / 10,
    );
    const deliveredTrend = Math.ceil(
      (Number(data.tDelivered) - Number(data.yDelivered)) / 10,
    );

    return {
      clicked: Number(data.clicked),
      contact: Number(data.contact),
      opened: Number(data.opened),
      delivered: Number(data.delivered),
      clickedTrend,
      deliveredTrend,
      openedTrend,
    };
  }

  async getBenchmarkData(subdomain: string): Promise<BenchmarkData[] | null> {
    const store = await this.storeRepo.findOne({
      where: {
        subdomain: subdomain,
      },
      relations: {
        about: true,
      },
    });
    if (!store || !store.about?.industry) return null;

    // const { endDate, startDate } = starAndEndDatesOfCurrenQuarter();

    // const getLevel = 0;

    //level 8, 15, 25, 38, 53, 70
    const stores = this.storeRepo
      .createQueryBuilder()
      .from(Store, 'store')
      .select('store.id', 'id')
      .groupBy('store.id')
      // .leftJoin('store.experiencePoint', 'xp')
      // .addSelect('SUM(xp.point)', 'points')
      // .orderBy('points', 'DESC')
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('COUNT(subscriber.id)', 'contact')
            .from(Subscriber, 'subscriber')
            .where('subscriber.storeId = store.id'),
        'contact',
      );
    // .where('xp.createdAt >= :startDate', {
    //   startDate,
    // })
    // .andWhere('xp.createdAt <= :endDate', {
    //   endDate,
    // });

    // if (getLevel < 8) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 8 });
    // } else if (getLevel < 15) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 15 });
    // } else if (getLevel < 25) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 25 });
    // } else if (getLevel < 38) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 38 });
    // } else if (getLevel < 53) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 53 });
    // } else if (getLevel < 70) {
    //   stores = stores.having('SUM(xp.point) < :level', { level: 80000 * 70 });
    // } else {
    //   stores = stores.having('SUM(xp.point) >= :level', { level: 80000 * 70 });
    // }
    const data: BenchmarkData[] = await stores
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'opened')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_OPENED,
          });
        return subquery;
      }, 'opened')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'delivered')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_DELIVERED,
          });
        return subquery;
      }, 'delivered')
      .addSelect((qb) => {
        const subquery = qb
          .subQuery()
          .select('COUNT(metric.id)', 'clicked')
          .from(Metric, 'metric')
          .where('metric.storeId = store.id')
          .andWhere('metric.metricType = :metricType', {
            metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
          });
        return subquery;
      }, 'clicked')
      .getRawMany();

    return data;
  }
}
