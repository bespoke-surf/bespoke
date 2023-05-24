import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Queue } from 'bull';
import { STORE_QUEST_QUEUE, STORE_WORKFLOW_QUEUE } from '../constants';
import { MetricTypeEnum } from '../metric/enum/metric-type.enum';
import {
  METRIC_EMAIL_BOUNCED_EVENT,
  METRIC_EMAIL_DROPPED_EVENT,
  METRIC_EMAIL_LINK_CLICKED_EVENT,
  METRIC_EMAIL_MARKED_AS_SPAM_EVENT,
  METRIC_EMAIL_OPENED_EVENT,
  METRIC_EMAIL_RECEIVED_EVENT,
  METRIC_EMAIL_SENT_EVENT,
  METRIC_EMAIL_UNSUBSCRIBED_EVENT,
  METRIC_POST_PUBLISHED_EVENT,
  METRIC_POST_VIEWED_EVENT,
  METRIC_SHOPIFY_CANCELLED_ORDER_EVENT,
  METRIC_SHOPIFY_CHECKOUT_STARTED_EVENT,
  METRIC_SHOPIFY_FULFILLED_ORDER_EVENT,
  METRIC_SHOPIFY_PLACED_ORDER_EVENT,
  METRIC_SHOPIFY_REFUNDED_ORDER_EVENT,
} from '../metric/metirc.service';
import { Metric } from '../metric/metric.entity';
import { SubscriberList } from '../subscriber-list/subscriber-list.entity';
import { SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT } from '../subscriber-list/subscriber-list.listner';
import { WorkflowActivityType } from '../workflow-state/enum/workflowActivityType.enum';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { WorkflowStateService } from '../workflow-state/workflow-state.service';
import { WorkflowService } from '../workflow/workflow.service';
import { StoreXPQuestQueueData } from './queues/store.questQueue';
import { StoreListWorkflowQueueData } from './queues/store.workflowQueue';
import { StoreService } from './store.service';

export type StartWorkfowQueueData =
  | {
      metricId: string;
      workflowActivityType: WorkflowActivityType;
      subscriberId: string;
      listId: string;
      type: 'LIST_TRIGGER';
    }
  | {
      metricId: string;
      workflowActivityType: WorkflowActivityType;
      subscriberId: string;
      metricType: MetricTypeEnum;
      type: 'METRIC_TRIGGER';
    };

@Injectable()
export class StoreListener {
  constructor(
    private workflowStateService: WorkflowStateService,
    private workflowService: WorkflowService,
    private storeService: StoreService,
    @InjectQueue(STORE_WORKFLOW_QUEUE)
    private readonly storeWorkflowQueue: Queue<StoreListWorkflowQueueData>,
    @InjectQueue(STORE_QUEST_QUEUE)
    private readonly storeXPQuestQueue: Queue<StoreXPQuestQueueData>,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {}

  @OnEvent(METRIC_POST_PUBLISHED_EVENT)
  async handlePostPublishedEvent(event: Metric) {
    await this.storeXPQuestQueue.add(
      {
        metricId: event.id,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  @OnEvent(METRIC_POST_VIEWED_EVENT)
  async handlePostViewedEvent(event: Metric) {
    await this.storeXPQuestQueue.add(
      {
        metricId: event.id,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  @OnEvent(SUBSCRIBER_LIST_ADD_SUBSCRIBER_TO_LIST_EVENT)
  async handleListSubscriberAddedToListEvent(event: SubscriberList) {
    try {
      const listId = event.listId;
      const subscriberId = event.subscriberId;

      await this.startWorkflowQueue({
        metricId: event.id,
        listId,
        type: 'LIST_TRIGGER',
        subscriberId,
        workflowActivityType: WorkflowActivityType.LIST_TRIGGER,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_EMAIL_BOUNCED_EVENT)
  async handleMetricEmailBouncedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_BOUNCED,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_EMAIL_DROPPED_EVENT)
  async handleMetricEmailDroppedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_DROPPED,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  @OnEvent(METRIC_EMAIL_LINK_CLICKED_EVENT)
  async handleMetricEmailLinkClickedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_EMAIL_MARKED_AS_SPAM_EVENT)
  async handleMetricEmailMarkedAsSpamEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_MARKED_AS_SPAM,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  @OnEvent(METRIC_EMAIL_OPENED_EVENT)
  async handleMetricEmailOpenedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_OPENED,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  @OnEvent(METRIC_EMAIL_RECEIVED_EVENT)
  async handleMetricEmailReceivedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_DELIVERED,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_EMAIL_SENT_EVENT)
  async handleMetricEmailSentEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_SENT,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_EMAIL_UNSUBSCRIBED_EVENT)
  async handleMetricUnsubscribedEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.EMAIL_UNSUBSCRIBED,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_SHOPIFY_CANCELLED_ORDER_EVENT)
  async handleMetricShopifyCancelledOrderEvent(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.SHOPIFY_CANCELLED_ORDER,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_SHOPIFY_CHECKOUT_STARTED_EVENT)
  async handleMetricShopifyCheckoutStared(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  @OnEvent(METRIC_SHOPIFY_FULFILLED_ORDER_EVENT)
  async handleMetricShopifyFulfilledOrder(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  @OnEvent(METRIC_SHOPIFY_PLACED_ORDER_EVENT)
  async handleMetricShopifyPlacedOrder(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      });
      await this.storeXPQuestQueue.add(
        {
          metricId: event.id,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  @OnEvent(METRIC_SHOPIFY_REFUNDED_ORDER_EVENT)
  async handleMetricShopifyRefundedOrder(event: Metric) {
    try {
      if (!event.subscriberId) throw new Error('subscriber Id missing');
      await this.startWorkflowQueue({
        metricId: event.id,
        type: 'METRIC_TRIGGER',
        subscriberId: event.subscriberId,
        workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
        metricType: MetricTypeEnum.SHOPIFY_REFUNDED_ORDER,
      });
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  async startWorkflowQueue(data: StartWorkfowQueueData) {
    try {
      const { subscriberId, type, workflowActivityType, metricId } = data;

      let workflowStates: WorkflowState[] | null | undefined = null;

      if (data.type === 'LIST_TRIGGER') {
        workflowStates =
          await this.workflowStateService.getWorkflowStatesWithListId(
            data.listId,
            workflowActivityType,
          );
      }

      if (data.type === 'METRIC_TRIGGER') {
        workflowStates =
          await this.workflowStateService.getWorkflowStatesWithMetricType(
            data.metricType,
            workflowActivityType,
          );
      }

      if (!workflowStates || workflowStates.length === 0 || !workflowStates[0])
        throw new Error('no workflow state');

      const filtered = await this.storeService.checkFlowFilterPermited(
        workflowStates[0].workflowId,
        metricId,
      );

      if (!filtered) throw new Error('filtered failed');

      const queueData = {
        triggredMetricId: metricId,
        subscriberId: subscriberId,
      };

      for (const state of workflowStates) {
        const workflow = await this.workflowService.getWorkflow(
          state.workflowId,
        );

        try {
          await this.storeService.checkWorkflowAuthorized(workflow);
        } catch {
          continue;
        }

        // if (workflow?.workflowStatus !== WorkflowStatus.LIVE) continue;

        // const store = await this.storeService.getStore(workflow?.storeId);
        // if (!store) continue;
        // const contactLimitStatus =
        //   await this.storeService.getContactLimitStatus(store);

        // if (contactLimitStatus === ContactLimitStatus.DISALLOWED) continue;
        // const emailLimitStatus =
        //   await this.storeService.getEmailSentLimitStatus(store);

        // if (emailLimitStatus === EmailSentLimitStatus.DISALLOWED) continue;

        if (type === 'LIST_TRIGGER') {
          await this.storeWorkflowQueue.add(
            {
              ...queueData,
              listId: data.listId,
              workflowStateId: state.id,
              type: 'LIST_TRIGGER',
            },
            { attempts: 0, removeOnFail: true, removeOnComplete: true },
          );
        }

        if (type === 'METRIC_TRIGGER') {
          const filtered = await this.storeService.checkTriggerFilterPermited(
            state.workflowId,
            queueData.triggredMetricId,
          );
          if (!filtered) return;
          await this.storeWorkflowQueue.add(
            {
              ...queueData,
              workflowStateId: state.id,
              type: 'METRIC_TRIGGER',
            },
            { attempts: 0, removeOnFail: true, removeOnComplete: true },
          );
        }
      }
    } catch (err) {
      console.log(err, 'workflow start error');
    }
  }
}
