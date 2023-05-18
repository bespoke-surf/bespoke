import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  InjectShopify,
  InjectShopifySessionStorage,
} from '@nestjs-shopify/core';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Shopify as ShopifyApi } from '@shopify/shopify-api';
import { Queue } from 'bull';
import { isEmpty } from 'class-validator';
import { Redis } from 'ioredis';
import IsEmail from 'isemail';
import { nanoid } from 'nanoid';
import invariant from 'tiny-invariant';
import {
  LOGIN_CONFIRMATION_PREFIX,
  REDIS_SESSION_ID_PREFIX,
  USER_CUSTOMER_UPLOAD_QUEUE,
  USER_STORE_UPLOAD_CSV_FILE_QUEUE,
} from '../constants';
import { EventAccessRestriction } from '../event/enum/eventConfidentiality';
import { EventState } from '../event/enum/eventState.enum';
import { EventType } from '../event/enum/eventType.enum';
import { EventService } from '../event/event.service';
import { List } from '../list/list.entity';
import { ListService } from '../list/list.service';
import { NotificationService } from '../notification/notification.service';
import { PosthogService } from '../posthog/posthog.service';
import { SesService } from '../ses/ses.service';
import { ShopifySessionStorage } from '../session/shopifySessionStorage';
import { Shopify } from '../shopify/shopify.entity';
import { ShopifyService } from '../shopify/shopify.service';
import { SignupFormService } from '../signup-form/signup-form.service';
import { Store } from '../store/store.entity';
import { StoreService } from '../store/store.service';
import { StripeService } from '../stripe/stripe.service';
import { AddCommaSeperatedEmailsToListInput } from '../subscriber-list/dto/addCommaSeperatedEmailsToList';
import { EmailConcentCollectedFrom } from '../subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from '../subscriber-list/enum/emailConcentOptInLevel.enum';
import { Subscriber } from '../subscriber/subscriber.entity';
import { SubscriberService } from '../subscriber/subscriber.service';
import { EnvironmentVariables, MyContext } from '../types';
import { CompleteOnboardingInput } from './dto/create-new-store-input';
import { CreateUserWithEmailInput } from './dto/createUserWithEmailInput.server';
import { EmailLoginInput } from './dto/emailLoginInput.server';
import { UploadCsvFileEmailsToListInput } from './dto/uploadCsvFile.intpu';
import { UserStoreUploadCSVFileQueueData } from './queue/uploadCsvFileQueue';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

interface SubscribeToStoreWithListId {
  storeId: string;
  email: string;
  listId: string;
  list: 'listId';
  firstName?: string;
  lastName?: string;
}
interface SubscribeToStoreWithoutListId {
  storeId: string;
  email: string;
  list: 'default' | 'shopify';
  firstName?: string;
  lastName?: string;
}

type SubscribeToStore =
  | SubscribeToStoreWithListId
  | SubscribeToStoreWithoutListId;
@Injectable()
export class UserService {
  constructor(
    @InjectQueue(USER_CUSTOMER_UPLOAD_QUEUE)
    private readonly userCustomerUploadQueue: Queue,
    @InjectQueue(USER_STORE_UPLOAD_CSV_FILE_QUEUE)
    private readonly userStoreUploadCsvFileQueue: Queue<UserStoreUploadCSVFileQueueData>,
    private subscriberService: SubscriberService,
    private userRepository: UserRepository,
    private storeService: StoreService,
    private shopifyService: ShopifyService,
    private signupFormService: SignupFormService,
    private configService: ConfigService<EnvironmentVariables>,
    private listService: ListService,
    private notificationService: NotificationService,
    private sesService: SesService,
    private stripeService: StripeService,
    private postHogService: PosthogService,
    @InjectRedis() private redis: Redis,
    @InjectShopify() private readonly shopifyApi: ShopifyApi,
    @InjectSentry() private readonly sentryService: SentryService,
    private eventService: EventService,
    @InjectShopifySessionStorage()
    private readonly shopifySessionStorage: ShopifySessionStorage,
  ) {}

  async me(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  async addUserToSession(userId: string, request: MyContext['req']) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return;

    request.session.userId = userId;
    // push session for a list of multiple session
    // can be used to track all the session the user has loggin in.
    // can be used to wipe all the ssession he has logged it
    if (request.sessionID) {
      await this.redis.lpush(
        `${REDIS_SESSION_ID_PREFIX}${userId}`,
        request.sessionID,
      );
    }
  }

  async getUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return true;
    return false;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { store: true },
    });
    return user ?? null;
  }

  async signupWithEmail(
    input: CreateUserWithEmailInput,
    supressLoginCode = true,
  ): Promise<User | null> {
    try {
      console.log({ input, supressLoginCode });
      const checkEmail = await this.userRepository.findOne({
        where: { email: input.email },
      });

      //if user exist with name then already signed up
      if (checkEmail && checkEmail.name) {
        return checkEmail;
      }

      let user: User | null = checkEmail;

      const stripeCustomer = await this.stripeService.createCustomer(
        input.name,
        input.email,
      );

      // update user with name
      if (checkEmail) {
        await this.userRepository.update(checkEmail.id, {
          email: input.email,
          name: input.name,
          stripeCustomerId: stripeCustomer.id,
        });
      } else {
        // or create user
        user = await this.userRepository.createUser({
          email: input.email,
          name: input.name,
          stripeCustomerId: stripeCustomer.id,
        });
      }

      if (!user) return null;
      if (!supressLoginCode) {
        await this.sesService.sendLoginOrSignupCode(input.email, user.id);
      }

      this.postHogService.capture({
        distinctId: user.id,
        event: 'User Signup',
        properties: {
          email: input.email,
        },
      });

      return user ?? null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async confirmCodeAndLogin(
    loginCode: string,
    context: MyContext,
  ): Promise<boolean> {
    try {
      const userId = await this.redis.get(
        `${LOGIN_CONFIRMATION_PREFIX}${loginCode}`,
      );

      await this.redis.del(`${LOGIN_CONFIRMATION_PREFIX}${loginCode}`);
      if (!userId) return false;

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) return false;

      await this.addUserToSession(userId, context.req);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async createUserWithEmailAndNoName(email: string): Promise<User | null> {
    const user = await this.userRepository.createUser({ email });
    return user ?? null;
  }

  async emailLogin(input: EmailLoginInput): Promise<User | null> {
    const userWithPassword = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!userWithPassword) {
      return null;
    }

    const user = await this.userRepository.findOne({
      where: { email: input.email },
      relations: { store: true },
    });

    if (!user) return null;

    await this.sesService.sendLoginOrSignupCode(input.email, user.id);

    this.postHogService.capture({
      distinctId: user.id,
      event: 'User Login',
      properties: {
        email: input.email,
      },
    });

    return user ?? null;
  }

  async logout(context: MyContext): Promise<boolean> {
    const { req, res } = context;

    if (req.session) {
      const { userId, id } = req.session;
      // to remove the current logged out session id from the list of mltiple session stored in a list
      const cookieName = this.configService.get('COOKIE_NAME');

      invariant(typeof cookieName === 'string', 'missign cookie name env');

      res.clearCookie(cookieName);

      req.session.destroy((err) => {
        if (err) {
          return false;
        } else {
          return true;
        }
      });

      await this.redis.lrem(`${REDIS_SESSION_ID_PREFIX}${userId}`, 0, id);
      // destroying the current session of the user

      return true;
    }
    return false;
  }

  //creates a user if not found and add the subscriber to store
  async addSubscriberToStore({
    storeId,
    email,
    firstName,
    lastName,
  }: {
    storeId: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }): Promise<Subscriber | null> {
    try {
      if (!IsEmail.validate(email)) throw Error('inavlid email');
      let user: User | null = null;
      user = await this.getUserByEmail(email);
      if (!user) {
        user = await this.createUserWithEmailAndNoName(email);
      }

      if (!user) throw new Error();

      const subscriber = await this.subscriberService.getStoreSubscriber(
        storeId,
        user.id,
      );

      if (subscriber) {
        await this.subscriberService.updateSubscriberName(
          subscriber.id,
          firstName,
          lastName,
        );
        return subscriber;
      } else {
        const newSubscirber = await this.subscriberService.createSubscriber(
          storeId,
          user.id,
          firstName,
          lastName,
        );
        return newSubscirber;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async subscribeToStore(args: SubscribeToStore): Promise<boolean> {
    try {
      const { email, list, storeId, firstName, lastName } = args;

      const store = await this.storeService.getStore(storeId);

      if (!store) throw new Error('missing store');
      if (!store.subdomain) throw new Error('missing subdomain');

      const subscriber = await this.addSubscriberToStore({
        email,
        storeId,
        firstName,
        lastName,
      });

      if (!subscriber) throw new Error();

      let defaultList: List | null = null;

      if (list === 'default') {
        defaultList = await this.listService.getStoreDefaultList(store.id);
      } else if (list === 'shopify') {
        const shopify = await this.shopifyService.getShopifyWithStoreId(
          store.id,
        );

        if (shopify?.listIdToCollectEmail) {
          defaultList = await this.listService.getList(
            shopify?.listIdToCollectEmail,
          );
        }
      } else if (list == 'listId') {
        defaultList = await this.listService.getList(args.listId);
      }

      if (!defaultList) throw new Error('missing list');

      const user = await this.userRepository.findOne({
        where: {
          id: store.user.id,
        },
      });

      if (!user) throw new Error();

      const subscriberList = await this.subscriberService.addSubscriberToList(
        defaultList?.id,
        subscriber?.id,
        EmailConcentCollectedFrom.LANDING_PAGE,
        EmailConcentOptInLevel.SINGLE_OPT_IN,
      );

      // const allowed = await this.storeService.checkUsageActivityAllowed(
      //   storeId,
      // );

      // if (!allowed && subscriberList) {
      //   await this.sendgridService.willLoseSubscriber(
      //     user.email,
      //     store.subdomain,
      //     defaultList.name,
      //     email,
      //   );
      // } else {
      const notification = await this.notificationService.getNotification(
        store.subdomain,
      );

      if (notification?.newSubscriber && subscriberList) {
        await this.sesService.newSubscriber(
          user.email,
          store.subdomain,
          defaultList.name,
          email,
        );
        await this.eventService.createEvent({
          eventAccessRestriction: EventAccessRestriction.HIGH,
          eventProducerId: defaultList.id,
          eventState: EventState.COMPLETED,
          eventType: EventType.LIST,
          userId: user.id,
          message: `A new subscriber ${email} was added to your list ${defaultList.name}`,
          showAsNotification: true,
          link: `/subscriber-lists/${defaultList.name}/${defaultList.id}`,
        });
      }
      this.postHogService.capture({
        distinctId: subscriber.userId,
        event: 'New Subscriber',
        properties: {
          subdomain: store.subdomain,
          storeId: store.id,
        },
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async subscribeToStoreFromForm(
    storeId: string,
    email: string,
    formId: string,
    firstName?: string,
    lastName?: string,
  ): Promise<boolean> {
    try {
      const getList = await this.signupFormService.getSignupForm(formId);
      if (!getList) throw new Error('no list id found');
      const respnose = await this.subscribeToStore({
        storeId,
        email,
        list: 'listId',
        listId: getList?.listId,
        firstName,
        lastName,
      });
      if (!respnose) return false;
      await this.signupFormService.incrementFormSubmission(formId);
      return true;
    } catch (err) {
      this.sentryService.instance().captureException(err);
      return false;
    }
  }

  async addCommaSeperatedEmailsToList(
    input: AddCommaSeperatedEmailsToListInput,
  ): Promise<boolean> {
    try {
      const emails = input.emails
        .split(',')
        .map((email) => email.trim())
        .filter((v) => !isEmpty(v));

      for (const email of emails) {
        const subscriber = await this.addSubscriberToStore({
          storeId: input.storeId,
          email,
        });
        if (subscriber) {
          await this.subscriberService.addSubscriberToList(
            input.listId,
            subscriber.id,
            EmailConcentCollectedFrom.IMPORT,
            EmailConcentOptInLevel.SINGLE_OPT_IN,
          );
        }
      }
      return true;
    } catch {
      return false;
    }
  }
  async uploadCsvFileEmailsToList(
    input: UploadCsvFileEmailsToListInput,
    userId: string,
  ): Promise<null> {
    try {
      const store = await this.storeService.getStoreWithSubdomain(
        input.subdomain,
      );
      if (!store) return null;
      this.userStoreUploadCsvFileQueue.add(
        {
          csvFileEmails: input.csvFileEmails,
          userId,
          listId: input.listId,
          storeId: store?.id,
        },
        { removeOnComplete: true, removeOnFail: true },
      );
      return null;
    } catch (err) {
      return null;
    }
  }

  async completeOnboarding(
    input: CompleteOnboardingInput,
    userId: string,
  ): Promise<Store | null> {
    try {
      const { subdomain } = input;

      const storeExist = await this.storeService.getStoreWithSubdomain(
        subdomain,
      );

      if (storeExist) return null;

      const available = await this.storeService.subdomainAvailable(input.name);

      if (!available) return null;

      const me = await this.me(userId);
      if (!me) return null;

      let store = await this.storeService.getUserStore(me.id);

      if (!store) {
        store = await this.storeService.createStore(me);
      }

      const updateStore = await this.storeService.updateStoreDetails({
        address1: input.address1,
        city: input.city,
        country: input.country,
        name: input.name,
        senderEmail: input.senderEmail,
        senderName: input.senderName,
        storeAbout: input.about,
        storeId: store.id,
        subdomain: input.subdomain,
        zipCode: input.zipCode,
        address2: input.address2,
        state: input.state,
      });

      this.postHogService.capture({
        distinctId: userId,
        event: 'New Store',
        properties: {
          storeName: updateStore?.name,
          subdomain: updateStore?.subdomain,
          storeId: store?.id,
        },
      });

      return updateStore ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async syncShopifyCustomers(shopifyId: string): Promise<null> {
    const shopify = await this.shopifyService.getShopify(shopifyId);

    if (!shopify) return null;

    const offlineId = this.shopifyApi.session.getOfflineId(shopify.storeUrl);

    const session = await this.shopifySessionStorage.loadSession(offlineId);

    const jobId = nanoid();
    this.userCustomerUploadQueue.add(session, {
      jobId,
      removeOnFail: true,
      removeOnComplete: true,
    });

    return null;
  }

  // this is used int the fronend when stopJobId is passed the job gets stopped
  async stopShopifyCustomerSync(
    shopifyId: string,
    stopJob?: boolean,
  ): Promise<Shopify | null> {
    const shopify = await this.shopifyService.getShopify(shopifyId);
    if (!shopify) return null;

    const jobId = shopify.productSyncJobId;

    await this.shopifyService.removedCustomerSyncJobId(shopify.id);

    if (!jobId) return null;

    const job = await this.userCustomerUploadQueue.getJob(jobId);
    if (!job) return null;

    if (stopJob) {
      job.moveToFailed({ message: 'Job stopped manualy' }, true);
    }

    return null;
  }

  async createOrUpdateShopifyCustomer(data: any, shop: string) {
    try {
      const createCustomer = data;
      const userEmail = createCustomer['email'];
      const firstName = createCustomer['first_name'];
      const lastName = createCustomer['last_name'];
      const marketingAccepts = createCustomer['accepts_marketing'];
      const phone = createCustomer['phone'];
      const shopify = await this.shopifyService.getShopifyWithStoreUrl(shop);

      const address = createCustomer['default_address'];
      const countryCode = address['country_code'];
      const provinceCode = address['province_code'];
      const address1 = address['address1'];
      const address2 = address['address2'];
      const city = address['city'];
      const zipCode = address['zip'];

      if (!shopify || !shopify.integration.store.subdomain) return;
      let subscriber: Subscriber | null = null;
      if (marketingAccepts === true && shopify?.listIdToCollectEmail) {
        const subscribed = await this.subscribeToStore({
          storeId: shopify.integration.store.id,
          email: userEmail,
          list: 'shopify',
          firstName,
          lastName,
        });
        if (subscribed) {
          subscriber = await this.subscriberService.getSubscriberWithEmail(
            shopify.integration.store.subdomain,
            userEmail,
          );
        }
      } else {
        subscriber = await this.addSubscriberToStore({
          email: userEmail,
          storeId: shopify.integration.store.id,
          firstName,
          lastName,
        });
      }
      if (subscriber) {
        await this.subscriberService.addOrUpdateSubscriberAddress({
          subscriber,
          address1,
          address2,
          city,
          country: countryCode,
          state: provinceCode,
          zipCode,
        });
        await this.subscriberService.updateSubscriberPhoneNumber(
          subscriber.id,
          phone,
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}
