import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  InjectQueue,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import type { Redis } from 'ioredis';
import Mail from 'nodemailer/lib/mailer';
import { STORE_WORKFLOW_QUEUE } from '../../constants';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';
import { MetricService } from '../../metric/metirc.service';
import { MetricShopifyCheckoutUpdate } from '../../metric/type/shopify/shopifycheckoutUpdateData.type';
import { ProductService } from '../../product/product.service';
import { SesService } from '../../ses/ses.service';
import { EmailConcentState } from '../../subscriber-list/enum/emailConcentState.enum';
import { SubscriberListService } from '../../subscriber-list/subscriber-list.service';
import { SubscriberEmailStatus } from '../../subscriber/enum/emailStatus.enum';
import { Subscriber } from '../../subscriber/subscriber.entity';
import { SubscriberService } from '../../subscriber/subscriber.service';
import { EnvironmentVariables } from '../../types';
import { EmailDeliveryStatus } from '../../user/enum/emailDeliveryStatus.enum';
import { WorkflowActivityType } from '../../workflow-state/enum/workflowActivityType.enum';
import { WorkflowStateDelayActivityValue } from '../../workflow-state/type/stateDelayValue';
import { WorkflowStateSendEmailActivityValue } from '../../workflow-state/type/stateEmailValue';
import { WorkflowState } from '../../workflow-state/workflow-state.entity';
import { WorkflowStateService } from '../../workflow-state/workflow-state.service';
import { WorkflowTransitionService } from '../../workflow-transition/workflow-transition.service';
import { WorkflowService } from '../../workflow/workflow.service';
import { EmailSentLimitStatus } from '../enum/emailSentLimitStatus.enum';
import { Contact } from '../store.entity';
import { StoreService } from '../store.service';
import { createUnsubscribeId } from '../utils/createUnsubscribeLInk';
import { HandleBarValues, smptpAutomationEmail } from './emailThings';

export type StoreListWorkflowQueueData =
  | {
      triggredMetricId: string;
      workflowStateId: string;
      subscriberId: string;
      listId: string;
      type: 'LIST_TRIGGER';
    }
  | {
      triggredMetricId: string;
      workflowStateId: string;
      subscriberId: string;
      type: 'METRIC_TRIGGER';
    };

@Processor(STORE_WORKFLOW_QUEUE)
export class StoreListWorkflowQueueProcessor {
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly workflowTransitionService: WorkflowTransitionService,
    private readonly workflowStateService: WorkflowStateService,
    @InjectQueue(STORE_WORKFLOW_QUEUE)
    private readonly storeWorkflowQueue: Queue<StoreListWorkflowQueueData>,
    private configService: ConfigService<EnvironmentVariables>,
    private sesService: SesService,
    private subscriberService: SubscriberService,
    private subscriberList: SubscriberListService,
    private storeService: StoreService,
    private metricService: MetricService,
    private productService: ProductService,
    @InjectRedis() private redis: Redis,
  ) {}

  @Process()
  async transcode(job: Job<StoreListWorkflowQueueData>) {
    try {
      const workflowStateId = job.data.workflowStateId;
      // failes if workflow was deleted as workflow state cascade deletes
      const workflowState = await this.workflowStateService.getWorkflowState(
        workflowStateId,
      );
      if (!workflowState?.workflowId) throw new Error('no worklfow id');
      const workflow = await this.workflowService.getWorkflow(
        workflowState?.workflowId,
      );

      await this.storeService.checkWorkflowAuthorized(workflow);

      const filtered = await this.storeService.checkFlowFilterPermited(
        workflowState?.workflowId,
        job.data.triggredMetricId,
      );

      if (!filtered) throw new Error('filter failed');

      if (
        workflowState?.workflowActivityType === WorkflowActivityType.SEND_EMAIL
      ) {
        const aumatedEmailData = {
          subscriberId: job.data.subscriberId,
          workflowState,
          triggredMetricId: job.data.triggredMetricId,
        };
        await this.sendAutomatedEmail(
          job.data.type === 'LIST_TRIGGER'
            ? {
                ...aumatedEmailData,
                listId: job.data.listId,
              }
            : aumatedEmailData,
        );
      }

      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error(JSON.stringify(error)));
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<StoreListWorkflowQueueData>) {
    const workflowStateId = job.data.workflowStateId;
    const transitions =
      await this.workflowTransitionService.getWorkflowTransitionsOfStates(
        workflowStateId,
      );
    if (!transitions[0]?.workflowId) return;

    const workflowState = await this.workflowStateService.getWorkflowState(
      workflowStateId,
    );

    let yesLine = true;

    if (
      workflowState?.workflowActivityType ===
      WorkflowActivityType.CONDITIONAL_SPLIT
    ) {
      const filtered =
        await this.storeService.checkConditionalFlowFilterPermited(
          workflowState.id,
          job.data.triggredMetricId,
        );
      if (!filtered) {
        yesLine = false;
      }
    }
    if (
      workflowState?.workflowActivityType === WorkflowActivityType.TRIGGER_SPLIT
    ) {
      const filtered = await this.storeService.checkTriggerSplitPermited(
        workflowState.id,
        job.data.triggredMetricId,
      );
      if (!filtered) {
        yesLine = false;
      }
    }

    for (const transition of transitions) {
      if (!transition?.nextStateId || !transition.otherWise !== yesLine) {
        continue;
      }
      const nextState = await this.workflowStateService.getWorkflowState(
        transition.nextStateId,
      );

      if (!nextState?.id) continue;

      let delay: number | undefined = undefined;

      if (nextState?.workflowActivityType === WorkflowActivityType.DELAY) {
        // create job with delay
        delay = (nextState.value as WorkflowStateDelayActivityValue)
          ?.delayInMilliseconds;
      }

      await this.storeWorkflowQueue.add(
        {
          ...job.data,
          workflowStateId: nextState.id,
        },
        { delay, attempts: 0, removeOnComplete: true, removeOnFail: true },
      );
    }
  }

  async sendAutomatedEmail({
    subscriberId,
    listId,
    workflowState,
    triggredMetricId,
  }: {
    subscriberId: string;
    workflowState: WorkflowState;
    triggredMetricId: string;
    listId?: string;
  }) {
    const subscriber = await this.subscriberService.getSubscriber(subscriberId);

    if (!subscriber) {
      throw new Error(`subscriber does not exist`);
    }

    if (listId) {
      const subscirberList = await this.subscriberList.getSubscriberList(
        subscriberId,
        listId,
      );
      if (
        subscirberList?.emailConcent.state !== EmailConcentState.SUBSCRIBED ||
        subscirberList?.subscriber.emailStatus !==
          SubscriberEmailStatus.SUBSCRIBED ||
        subscirberList.subscriber.user.userEmailDeliveryStatus
          .emailDeliveryStatus !== EmailDeliveryStatus.SUBSCRIBED
      ) {
        throw new Error('subscriber-list unsubscired or global unsubscribed');
      }
    } else {
      const subscriber = await this.subscriberService.getSubscriber(
        subscriberId,
      );

      if (
        subscriber?.emailStatus !== SubscriberEmailStatus.SUBSCRIBED &&
        subscriber?.user.userEmailDeliveryStatus.emailDeliveryStatus !==
          EmailDeliveryStatus.SUBSCRIBED
      ) {
        throw new Error('subscriber unsubscrd or global unsubscribe');
      }
    }

    await this.sendEmail({
      subscriber,
      listId,
      triggredMetricId,
      workflowState,
    });
  }

  async sendEmail({
    subscriber,
    listId,
    triggredMetricId,
    workflowState,
  }: {
    subscriber: Subscriber;
    listId?: string;
    triggredMetricId: string;
    workflowState: WorkflowState;
  }) {
    try {
      const frontEndHost = this.configService.get('FRONTEND_HOST');
      const host = this.configService.get('HOST');
      const frontEndHostProtocol = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );

      const value = workflowState?.value as WorkflowStateSendEmailActivityValue;

      if (!workflowState) throw new Error('no workflow state');

      const store = await this.storeService.getStoreDetails(subscriber.storeId);
      if (!store) throw new Error('no store id');

      const emailSendStatus = await this.storeService.getEmailSentLimitStatus(
        store,
      );

      if (!store.subdomain) throw Error('missing subodmain');

      if (emailSendStatus === EmailSentLimitStatus.DISALLOWED) {
        // await this.sesService.automatedEmailFailed(
        //   store.user.email,
        //   store.subdomain,
        //   workflowState.name,
        // );

        //once failed it does not rerun
        throw new Error('not enough email sends');
        // return Promise.resolve();
      }

      let createUnsubParams: {
        listId?: string;
        subscriberId: string;
        redis: Redis;
      } = {
        subscriberId: subscriber.id,
        redis: this.redis,
      };
      if (listId) {
        createUnsubParams = {
          ...createUnsubParams,
          listId: listId,
        };
      }

      const unsubscribeId = createUnsubscribeId(createUnsubParams);

      const handleBarValues = await this.getHandleBarValues({
        triggredMetricId,
        storeUrl: `${frontEndHostProtocol}//${store.subdomain}.${frontEndHost}`,
        unsubscribeId,
        contact: store.contact,
      });

      const mail: Mail.Options = smptpAutomationEmail({
        html: value.html,
        subject: workflowState.name,
        storeWithContact: store,
        frontEndHost,
        frontEndHostProtocol,
        host,
        listId,
        subscriber,
        handleBarValues: handleBarValues ? handleBarValues : undefined,
        unsubscribeId,
      });

      return this.sesService.send([mail]);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        throw new Error(`${err.message}`);
      }
      throw new Error();
    }
  }

  async getHandleBarValues({
    triggredMetricId,
    storeUrl,
    unsubscribeId,
    contact,
  }: {
    triggredMetricId: string;
    storeUrl: string;
    unsubscribeId: string;
    contact?: Contact | null;
  }): Promise<HandleBarValues | null> {
    let handleBarValues: HandleBarValues | null = {};
    const metric = await this.metricService.getMetricById(triggredMetricId);

    handleBarValues = {
      unsubscribeLink: `${storeUrl}/unsubscribe/${unsubscribeId}`,
    };
    if (contact) {
      handleBarValues = {
        ...handleBarValues,
        contact,
      };
    }

    if (metric?.data?.type === MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED) {
      const { abandoned_checkout_url, line_items } =
        metric.data as MetricShopifyCheckoutUpdate;

      handleBarValues = {
        ...handleBarValues,
        abandoned_checkout_url,
      };

      if (line_items[line_items.length - 1]?.product_id) {
        const zero = await this.productService.getShopifyProductWithId(
          `gid://shopify/Product/${
            line_items[line_items.length - 1]?.product_id
          }`,
        );
        if (zero) {
          const product_zero = {
            img_src: zero?.image?.[0]?.src ?? '',
            name: zero?.name ?? '',
            price: `${String(zero?.price / 100)}${
              (zero?.price / 100) % 1 === 0 ? '.00' : null
            }`,
            url: zero?.externalLink ?? '',
          };
          handleBarValues = {
            ...handleBarValues,
            abandoned_cart_product: {
              product_zero,
            },
          };
        }
      }
      if (line_items[line_items.length - 2]?.product_id) {
        const firstItem = await this.productService.getShopifyProductWithId(
          `gid://shopify/Product/${
            line_items[line_items.length - 2]?.product_id
          }`,
        );
        if (firstItem) {
          const product_one = {
            img_src: firstItem?.image?.[0]?.src ?? '',
            name: firstItem?.name ?? '',
            price: `${String(firstItem?.price / 100)}${
              (firstItem?.price / 100) % 1 === 0 ? '.00' : null
            }`,
            url: firstItem?.externalLink ?? '',
          };
          handleBarValues = {
            ...handleBarValues,
            abandoned_cart_product: {
              ...handleBarValues.abandoned_cart_product,
              product_one,
            },
          };
        }
      }

      if (line_items[line_items.length - 3]?.product_id) {
        const secondItem = await this.productService.getShopifyProductWithId(
          `gid://shopify/Product/${
            line_items[line_items.length - 3]?.product_id
          }`,
        );
        if (secondItem) {
          const product_two = {
            img_src: secondItem?.image?.[0]?.src ?? '',
            name: secondItem?.name ?? '',
            price: `${String(secondItem?.price / 100)}${
              (secondItem?.price / 100) % 1 === 0 ? '.00' : null
            }`,
            url: secondItem?.externalLink ?? '',
          };
          handleBarValues = {
            ...handleBarValues,
            abandoned_cart_product: {
              ...handleBarValues.abandoned_cart_product,
              product_two,
            },
          };
        }
      }
      return handleBarValues;
    }
    return null;
  }
}
