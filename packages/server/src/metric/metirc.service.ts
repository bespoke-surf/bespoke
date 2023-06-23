import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import getSymbolFromCurrency from 'currency-symbol-map';
import dayjs, { OpUnitType } from 'dayjs';
import { Not, Repository } from 'typeorm';
import { DelayTypeEnum } from '../enum/delaytype.enum';
import { MonthTypeEnum } from '../enum/monthType.enum';
import { DAYJS_TIMESTAMPZ_FORMAT } from '../utils/constants';
import {
  StartOfEndOfUnitType,
  getStarAndEndOfUnits,
} from '../utils/quarterDates';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { WorkflowStateService } from '../workflow-state/workflow-state.service';
import { BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum } from '../workflow/type/baseCoindtionalFilter/enum/hasDoneOrNotDoneTimeExpression.enum';
import { BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum } from '../workflow/type/baseCoindtionalFilter/enum/hasDoneOrNotDoneTrigger.enum';
import { BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum } from '../workflow/type/baseCoindtionalFilter/enum/hasDoneOrNotDoneValueInequalitExpression.enum';
import {
  BaseConditionalFilterHasDoneOrNotDoneValueInequality,
  BaseConditionalFilterHasDoneOrNotDoneValueTime,
} from '../workflow/type/baseCoindtionalFilter/hasDoneOrNotDoneValue';
import { BaseTriggerFilterBooleanValue } from '../workflow/type/baseTriggerFilter/booleanType';
import { BaseTriggerFilterDateValueExpressionEnum } from '../workflow/type/baseTriggerFilter/dateType/expression';
import { BaseTriggerFilterDimensionEnum } from '../workflow/type/baseTriggerFilter/enum/condition';
import { BaseTriggerFilterTypeEnum } from '../workflow/type/baseTriggerFilter/enum/type';
import { BaseTriggerFilterListValue } from '../workflow/type/baseTriggerFilter/listType';
import { BaseTriggerFilterListValueExpressionEnum } from '../workflow/type/baseTriggerFilter/listType/expression.enum';
import { BaseTriggerFilterNumberValueExpressionEnum } from '../workflow/type/baseTriggerFilter/numberType/expressionEnum';
import { BaseTriggerFilterNumberValue } from '../workflow/type/baseTriggerFilter/numberTypeValue';
import { BaseTriggerFilterTextValueExpressionEnum } from '../workflow/type/baseTriggerFilter/textType/expressionEnum';
import { BaseTriggerFilterTextValue } from '../workflow/type/baseTriggerFilter/textTypeValue';
import { BaseTriggerFilterValueUnion } from '../workflow/type/baseTriggerFilter/triggerFilterValueUnion';
import { MetricTypeEnum } from './enum/metric-type.enum';
import { Metric } from './metric.entity';
import { MetricEmailLinkClicked } from './type/emailLinkClickedEvent.type';
import { MetricPostViewed, MetricUtmDataType } from './type/postviewed.type';
import { MetricShopifyCancelledOrder } from './type/shopify/cancelledOrderData.type';
import { MetricShopifyFulfilledOrder } from './type/shopify/fulfilledOrderData.type';
import { MetricShopifyOrderedProduct } from './type/shopify/orderedProductData.type';
import { MetricShopifyPlacedOrder } from './type/shopify/placedOrderData.type';
import { MetricShopifyRefundedOrder } from './type/shopify/refundedOrderData.type';
import { MetricShopifyCheckoutUpdate } from './type/shopify/shopifycheckoutUpdateData.type';

export const METRIC_SHOPIFY_PLACED_ORDER_EVENT =
  'metric_shopify_placed_order_event';

export const METRIC_SHOPIFY_CHECKOUT_STARTED_EVENT =
  'maetric_shopify_checkout_started_event';

export const METRIC_SHOPIFY_FULFILLED_ORDER_EVENT =
  'metric_shopify_fulfilled_order_event';

export const METRIC_SHOPIFY_CANCELLED_ORDER_EVENT =
  'metric_shopify_cancelled_order_event';

export const METRIC_SHOPIFY_REFUNDED_ORDER_EVENT =
  'metric_shopify_refunded_order_event';

export const METRIC_SHOPIFY_ORDERED_PRODUCT_EVENT =
  'metric_shopify_ordered_product_event';

export const METRIC_POST_PUBLISHED_EVENT = 'metric_post_published_event';
export const METRIC_POST_VIEWED_EVENT = 'metric_post_viewed_event';

export const METRIC_EMAIL_BOUNCED_EVENT = 'metric_email_bounced_event';
export const METRIC_EMAIL_LINK_CLICKED_EVENT =
  'metric_link_email_clicked_event';
export const METRIC_EMAIL_DROPPED_EVENT = 'metric_email_dropped_event';
export const METRIC_EMAIL_SENT_EVENT = 'metric_email_sent_event';
export const METRIC_EMAIL_MARKED_AS_SPAM_EVENT =
  'metric_email_marked_as_spam_event';
export const METRIC_EMAIL_OPENED_EVENT = 'metric_email_opened_event';
export const METRIC_EMAIL_RECEIVED_EVENT = 'metric_email_received_event';
export const METRIC_EMAIL_UNSUBSCRIBED_EVENT =
  'metric_email_unsubscribed_event';

@Injectable()
export class MetricService {
  constructor(
    @InjectRepository(Metric)
    private readonly metricRepo: Repository<Metric>,
    @InjectSentry() private readonly sentryClient: SentryService,
    private workflowStateService: WorkflowStateService,
    private eventEmitter: EventEmitter2,
  ) {}

  async emitEvent(eventName: string, metricId: string): Promise<void> {
    const metric = await this.metricRepo.findOne({
      where: {
        id: metricId,
      },
    });

    this.eventEmitter.emit(eventName, metric);
  }

  async getPlacedOrderCount(subscriberId: string): Promise<number> {
    const placedOrder = await this.metricRepo.count({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      },
    });
    return placedOrder;
  }

  async getFulfilledOrderCount(subscriberId: string): Promise<number> {
    const placedOrder = await this.metricRepo.count({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER,
      },
    });
    return placedOrder;
  }

  async getSubscriberRevenue(subscriberId: string): Promise<number> {
    const placedOrder = await this.metricRepo.find({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      },
    });
    let total = 0;

    placedOrder.forEach((order) => {
      const total_price = Number(
        (order.data as MetricShopifyPlacedOrder).total_price,
      );
      total += Number(total_price ?? 0);
    });
    return Math.trunc(total * 100);
  }

  async getPlacedOrderRevenue(storeId: string): Promise<number> {
    const { revenue } = await this.metricRepo
      .createQueryBuilder('metric')
      .select("SUM(cast(metric.data->>'total_price' as numeric))", 'revenue')
      .where('metric.storeId = :storeId', { storeId })
      .andWhere('metric.metricType = :metricType', {
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      })
      .getRawOne();

    return Math.trunc((Number(revenue) ? Number(revenue) : 0) * 100);
  }

  async getDailyRevenueTrend(storeId: string): Promise<number> {
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

    const { yRevenue } = await this.metricRepo
      .createQueryBuilder('metric')
      .select("SUM(cast(metric.data->>'total_price' as numeric))", 'yRevenue')
      .where('metric.createdAt >= :yStartDay', { yStartDay })
      .andWhere('metric.createdAt <= :yEndDay', { yEndDay })
      .andWhere('metric.metricType = :metricType', {
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      })
      .andWhere('metric.storeId = :storeId', { storeId })
      .getRawOne();
    const { revenue } = await this.metricRepo
      .createQueryBuilder('metric')
      .select("SUM(cast(metric.data->>'total_price' as numeric))", 'revenue')
      .where('metric.createdAt >= :startDay', { startDay })
      .andWhere('metric.createdAt <= :endDay', { endDay })
      .andWhere('metric.metricType = :metricType', {
        metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      })
      .andWhere('metric.storeId = :storeId', { storeId })
      .getRawOne();

    const change = Math.round(
      ((Number(yRevenue) - Number(revenue)) / Number(revenue)) * 100,
    );

    return Math.trunc(change ? change : 0);
  }

  async checkIfDataAdded(id: string, subscriberId: string) {
    const added = await this.metricRepo
      .createQueryBuilder('subscriberMetric')
      .where('subscriberMetric.data @> :data', { data: { id } })
      .andWhere('subscriberMetric.subscriberId =:subscriberId', {
        subscriberId,
      })
      .getOne();

    if (added) return true;
    return false;
  }

  async createPostPublishedMetric(
    postId: string,
    postTitle: string,
    storeId: string,
  ): Promise<null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.POST_PUBLISHED,
      message: `Published ${postTitle} newsletter`,
      postId,
      storeId,
      data: {
        type: MetricTypeEnum.POST_PUBLISHED,
      } as MetricPostViewed,
    });

    this.emitEvent(METRIC_POST_PUBLISHED_EVENT, metric.id);

    return null;
  }

  async createPostUnPublishedMetric(
    postId: string,
    postTitle: string,
    storeId: string,
  ): Promise<null> {
    await this.metricRepo.save({
      metricType: MetricTypeEnum.POST_UNPUBLISHED,
      message: `Unpublished ${postTitle} newsletter`,
      postId,
      storeId,
      data: {
        type: MetricTypeEnum.POST_UNPUBLISHED,
      } as MetricPostViewed,
    });
    return null;
  }

  async createPostDeletedMetric(
    postId: string,
    postTitle: string,
    storeId: string,
  ): Promise<null> {
    await this.metricRepo.save({
      metricType: MetricTypeEnum.POST_DELETED,
      message: `Deleted ${postTitle} newsletter`,
      postId,
      storeId,
      data: {
        type: MetricTypeEnum.POST_DELETED,
      } as MetricPostViewed,
    });
    return null;
  }

  async createPostViewedMetric(
    postId: string,
    storeId: string,
    referer?: string,
    utmData?: MetricUtmDataType,
    ipAddress?: string,
  ): Promise<null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.POST_VIEWED,
      message: `Post viewed`,
      postId,
      storeId,
      data: {
        type: MetricTypeEnum.POST_VIEWED,
        referer,
        ipAddress,
        utm: utmData,
      } as MetricPostViewed,
    });

    this.emitEvent(METRIC_POST_VIEWED_EVENT, metric.id);

    return null;
  }

  async createCheckoutStartedMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ) {
    const checkoutStarted = data;

    const id = checkoutStarted['id'];

    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED,
      message: `Checkout Started`,
      subscriberId,
      storeId,
      data: {
        ...checkoutStarted,
        id,
        type: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED,
      } as MetricShopifyCheckoutUpdate,
    });
    if (metric) {
      this.emitEvent(METRIC_SHOPIFY_CHECKOUT_STARTED_EVENT, metric.id);
    }

    return metric;
  }

  async createPlacedOrderMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ): Promise<Metric | null> {
    const placedOrderData = data;
    const id = placedOrderData['id'];

    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      message: `Placed Order for ${getSymbolFromCurrency(
        placedOrderData['currency'],
      )}${placedOrderData['total_price']}`,
      storeId,
      data: {
        ...placedOrderData,
        id,
        type: MetricTypeEnum.SHOPIFY_PLACED_ORDER,
      } as MetricShopifyPlacedOrder,
      subscriberId,
    });
    if (metric) {
      this.emitEvent(METRIC_SHOPIFY_PLACED_ORDER_EVENT, metric.id);
    }

    return metric;
  }

  async createFulfilledOrderMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ): Promise<Metric | null> {
    const fulfilledOrder = data;
    const id = fulfilledOrder['id'];

    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER,
      message: `Fulfilled Order`,
      subscriberId,
      storeId,
      data: {
        ...fulfilledOrder,
        id,
        type: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER,
      } as MetricShopifyFulfilledOrder,
    });

    if (metric) {
      this.emitEvent(METRIC_SHOPIFY_FULFILLED_ORDER_EVENT, metric.id);
    }

    return metric;
  }

  async createCancelledOrderMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ): Promise<Metric | null> {
    const cancelledOrder = data;
    const id = cancelledOrder['id'];

    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.SHOPIFY_CANCELLED_ORDER,
      message: `Cancelled Order`,
      subscriberId,
      storeId,
      data: {
        ...cancelledOrder,
        id,
        type: MetricTypeEnum.SHOPIFY_CANCELLED_ORDER,
      } as MetricShopifyCancelledOrder,
    });
    if (metric) {
      this.emitEvent(METRIC_SHOPIFY_CANCELLED_ORDER_EVENT, metric.id);
    }

    return metric;
  }

  async createOrderRefundMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ): Promise<Metric | null> {
    const orderCancelled = data;
    const id = orderCancelled['id'];
    const refund_line_items: Array<any> = orderCancelled['refund_line_items'];

    let subtotal = 0;
    let total_with_tax = 0;

    for (const items of refund_line_items) {
      const subtotal_amount = items['subtotal'];
      const tax = items['total_tax'];
      subtotal += subtotal_amount;
      total_with_tax += tax + subtotal_amount;
    }

    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.SHOPIFY_REFUNDED_ORDER,
      message: `Refunded Order`,
      storeId,
      subscriberId,
      data: {
        ...orderCancelled,
        calculatedSubtotal: subtotal * 100,
        calculatedTotalWithTtax: total_with_tax * 100,
        id,
        type: MetricTypeEnum.SHOPIFY_REFUNDED_ORDER,
      } as MetricShopifyRefundedOrder,
    });
    if (metric) {
      this.emitEvent(METRIC_SHOPIFY_REFUNDED_ORDER_EVENT, metric.id);
    }
    return metric;
  }
  async createOrderedProductMetric(
    data: any,
    subscriberId: string,
    storeId: string,
  ): Promise<null> {
    const orderedProduct = data;
    const line_items: Array<any> = orderedProduct['line_items'];

    for (const items of line_items) {
      const name = items['name'];
      const title = items['title'];
      const price = items['price'];

      const metric = await this.metricRepo.save({
        metricType: MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT,
        message: `Ordered ${name ? name : title} for ${price}`,
        subscriberId,
        storeId,
        data: {
          ...items,
          type: MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT,
        } as MetricShopifyOrderedProduct,
      });
      this.emitEvent(METRIC_SHOPIFY_ORDERED_PRODUCT_EVENT, metric.id);
    }
    return null;
  }

  async createEmailOpenedMetric(
    postId: string,
    subscriberId: string,
    listId: string,
    postTitle: string,
    storeId: string,
  ): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_OPENED,
      message: `Email opened: ${postTitle}`,
      subscriberId,
      storeId,
      postId,
      listId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_OPENED_EVENT, metric.id);
    }

    return metric;
  }

  async createFormViewedMetric(
    signupFormId: string,
    formName: string,
    storeId: string,
  ): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.FORM_VIEWED,
      message: `Signup Form ${formName} viewed`,
      storeId,
      signupFormId,
    });

    return metric;
  }

  async createFormSubmittedMetric(
    signupFormId: string,
    formName: string,
    storeId: string,
  ): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.FORM_SUBMITTED,
      message: `Signup Form ${formName} submitted`,
      signupFormId,
      storeId,
    });

    return metric;
  }

  async createEmailSentMetric(
    postId: string,
    subscriberId: string,
    listId: string,
    postTitle: string,
    storeId: string,
  ): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_SENT,
      message: `Email sent: ${postTitle}`,
      subscriberId,
      postId,
      listId,
      storeId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_SENT_EVENT, metric.id);
    }
    return metric;
  }

  async createEmailDeliveredMetric(
    postId: string,
    subscriberId: string,
    listId: string,
    postTitle: string,
    storeId: string,
  ): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_DELIVERED,
      message: `Email delivered: ${postTitle}`,
      subscriberId,
      postId,
      listId,
      storeId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_RECEIVED_EVENT, metric.id);
    }

    return metric;
  }

  async createEmailLinkClickedMetric(
    postId: string,
    subscriberId: string,
    listId: string,
    clickData: MetricEmailLinkClicked,
    storeId: string,
  ): Promise<Metric | null> {
    try {
      const metric = await this.metricRepo.save({
        metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
        message: `Email link clicked: ${clickData.link}`,
        subscriberId,
        postId,
        listId,
        storeId,
        data: {
          ...clickData,
          type: MetricTypeEnum.EMAIL_LINK_CLICKED,
        } as MetricEmailLinkClicked,
      });
      if (metric) {
        this.emitEvent(METRIC_EMAIL_LINK_CLICKED_EVENT, metric.id);
      }

      return metric;
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);

      return null;
    }
  }

  async createEmailBounced({
    listId,
    postId,
    storeId,
    subscriberId,
  }: {
    postId?: string;
    subscriberId: string;
    listId?: string;
    storeId: string;
  }): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_BOUNCED,
      message: `Email Bounced. Unsubscribed from list`,
      subscriberId,
      storeId,
      postId,
      listId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_BOUNCED_EVENT, metric.id);
    }

    return metric;
  }
  async createEmailDropped({
    postId,
    subscriberId,
    listId,
    storeId,
  }: {
    postId?: string;
    listId?: string;
    subscriberId: string;
    storeId: string;
  }): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_DROPPED,
      message: `Email Dropped. Unsubscribed from list`,
      subscriberId,
      storeId,
      postId,
      listId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_DROPPED_EVENT, metric.id);
    }

    return metric;
  }

  async createEmailMarkedAsSapm({
    listId,
    postId,
    storeId,
    subscriberId,
  }: {
    postId?: string;
    subscriberId: string;
    listId?: string;
    storeId: string;
  }): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_MARKED_AS_SPAM,
      message: `Email Marked As Spam. Unsubscribed from list`,
      subscriberId,
      postId,
      storeId,
      listId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_MARKED_AS_SPAM_EVENT, metric.id);
    }

    return metric;
  }

  async createEmailUnsubscribed({
    storeId,
    subscriberId,
    listId,
    postId,
  }: {
    subscriberId: string;
    listId?: string;
    storeId: string;
    postId?: string;
  }): Promise<Metric | null> {
    const metric = await this.metricRepo.save({
      metricType: MetricTypeEnum.EMAIL_UNSUBSCRIBED,
      message: `Email Unsubscribed`,
      subscriberId,
      listId,
      postId,
      storeId,
    });
    if (metric) {
      this.emitEvent(METRIC_EMAIL_UNSUBSCRIBED_EVENT, metric.id);
    }

    return metric;
  }

  async getEmailReceivedCount(subscriberId: string): Promise<number> {
    const emailsReceived = await this.metricRepo.count({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.EMAIL_DELIVERED,
      },
    });
    return emailsReceived;
  }

  async getEmailOpenedCount(subscriberId: string): Promise<number> {
    const emailsReceived = await this.metricRepo.count({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.EMAIL_OPENED,
      },
    });
    return emailsReceived;
  }
  async getEmailSentCountByPostId(postId: string): Promise<number> {
    const emailsReceived = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.EMAIL_SENT,
        postId,
      },
    });
    return emailsReceived;
  }
  async getEmailOpenedCountByPostId(postId: string): Promise<number> {
    const emailsReceived = await this.metricRepo.count({
      where: {
        postId,
        metricType: MetricTypeEnum.EMAIL_OPENED,
      },
    });
    return emailsReceived;
  }

  async getEmailLinkClickedCount(subscriberId: string): Promise<number> {
    const emailsReceived = await this.metricRepo.count({
      where: {
        subscriberId,
        metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
      },
    });
    return emailsReceived;
  }

  async getMetricsByType(
    subdomain: string,
    take: number,
    skip: number,
    metricType?: MetricTypeEnum,
    allMetric?: boolean,
  ): Promise<Metric[] | null> {
    const subscriberMetric = await this.metricRepo.find({
      where: {
        metricType: allMetric
          ? Not(MetricTypeEnum.POST_VIEWED) ||
            Not(MetricTypeEnum.FORM_SUBMITTED) ||
            Not(MetricTypeEnum.FORM_VIEWED)
          : metricType,
        subscriber: {
          store: {
            subdomain,
          },
        },
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        subscriber: {
          user: true,
        },
      },
    });
    return subscriberMetric ?? null;
  }

  async getSubscriberMetricsByType(
    subscriberId: string,
    take: number,
    skip: number,
    metricType: MetricTypeEnum,
    allMetric: boolean,
  ): Promise<Metric[] | null> {
    const metrics = await this.metricRepo.find({
      where: {
        metricType: allMetric ? Not(MetricTypeEnum.POST_VIEWED) : metricType,
        subscriberId,
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        subscriber: {
          user: true,
        },
      },
    });
    return metrics;
  }

  async getPostMetricCountByIpUnique(postId: string): Promise<number> {
    //TODO: make this uniqu by ipaddress
    // const count = await this.metricRepo
    //   .createQueryBuilder('metric')
    //   .where('metric.postId =:postId', { postId })
    //   .distinctOn(['metric.data.ipAddress'])
    //   .getCount();

    const count = await this.metricRepo.count({
      where: [
        {
          metricType: MetricTypeEnum.EMAIL_OPENED,
          postId,
        },
        {
          postId,
          metricType: MetricTypeEnum.POST_VIEWED,
        },
      ],
    });

    return count;
  }

  async getEmailSentTodayCount(subdomain: string): Promise<number> {
    const day = dayjs()
      .utc()
      .startOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const subscribers = await this.metricRepo
      .createQueryBuilder('metric')
      .leftJoinAndSelect('metric.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.store', 'store')
      .where('store.subdomain =:subdomain', { subdomain })
      .andWhere('metric.createdAt >= :date', { date: day })
      .andWhere('metric.metricType = :metricType', {
        metricType: MetricTypeEnum.EMAIL_SENT,
      })
      .getCount();

    return subscribers;
  }

  async getEmailSentDuringPeriod({
    subdomain,
    unit,
    unixTime,
  }: {
    subdomain: string;
    unit?: OpUnitType;
    unixTime?: number;
  }): Promise<number> {
    let day;
    if (unit) {
      day = dayjs().utc().startOf(unit).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    if (unixTime) {
      day = dayjs.unix(unixTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    const subscribers = await this.metricRepo
      .createQueryBuilder('metric')
      .leftJoinAndSelect('metric.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.store', 'store')
      .where('store.subdomain =:subdomain', { subdomain })
      .andWhere('metric.createdAt >= :date', { date: day })
      .andWhere('metric.metricType = :metricType', {
        metricType: MetricTypeEnum.EMAIL_SENT,
      })
      .getCount();

    return subscribers;
  }

  async getFormViewedCount(formId: string): Promise<number> {
    const views = await this.metricRepo.count({
      where: {
        signupFormId: formId,
        metricType: MetricTypeEnum.FORM_VIEWED,
      },
    });
    return views;
  }
  async getTotalFormViewedCount(subdomain: string): Promise<number> {
    const views = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.FORM_VIEWED,
        store: {
          subdomain,
        },
      },
    });
    return views;
  }

  async getFormSubmittedCount(formId: string): Promise<number> {
    const views = await this.metricRepo.count({
      where: {
        signupFormId: formId,
        metricType: MetricTypeEnum.FORM_SUBMITTED,
      },
    });
    return views;
  }
  async getTotalFormSubmittedCount(subdomain: string): Promise<number> {
    const views = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.FORM_SUBMITTED,
        store: {
          subdomain,
        },
      },
    });
    return views;
  }

  async createMetricTrigger(
    metricType: MetricTypeEnum,
    workflowId: string,
  ): Promise<WorkflowState | null> {
    const state = await this.workflowStateService.createMetricState(
      metricType,
      workflowId,
    );
    return state ?? null;
  }

  async updateMetricTrigger(
    metricType: MetricTypeEnum,
    workflowStateId: string,
  ): Promise<null> {
    await this.workflowStateService.updateMetricWorkflowState(
      metricType,
      workflowStateId,
    );
    return null;
  }

  async getMetricHasDoneOrNotDoneFilter(
    triggeredMetricId: string,
    trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum,
    inequlity?: BaseConditionalFilterHasDoneOrNotDoneValueInequality,
    time?: BaseConditionalFilterHasDoneOrNotDoneValueTime,
  ): Promise<boolean> {
    if (!trigger) throw new Error('no trigger');

    let metricType: MetricTypeEnum | undefined = undefined;

    let returnValue = false;

    switch (trigger) {
      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_BOUNCED:
        metricType = MetricTypeEnum.EMAIL_BOUNCED;
        break;
      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_DROPPED:
        metricType = MetricTypeEnum.EMAIL_DROPPED;
        break;
      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_LINK_CLICKED:
        metricType = MetricTypeEnum.EMAIL_LINK_CLICKED;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_MARKED_AS_SPAM:
        metricType = MetricTypeEnum.EMAIL_MARKED_AS_SPAM;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_OPENED:
        metricType = MetricTypeEnum.EMAIL_OPENED;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_RECEIVED:
        metricType = MetricTypeEnum.EMAIL_DELIVERED;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_SENT:
        metricType = MetricTypeEnum.EMAIL_SENT;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.EMAIL_UNSUBSCRIBED:
        metricType = MetricTypeEnum.EMAIL_UNSUBSCRIBED;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.SHOPIFY_CANCELLED_ORDER:
        metricType = MetricTypeEnum.SHOPIFY_CANCELLED_ORDER;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.SHOPIFY_CHECKOUT_STARTED:
        metricType = MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.SHOPIFY_FULFILLED_ORDER:
        metricType = MetricTypeEnum.SHOPIFY_FULFILLED_ORDER;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.SHOPIFY_PLACED_ORDER:
        metricType = MetricTypeEnum.SHOPIFY_PLACED_ORDER;
        break;

      case BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum.SHOPIFY_REFUNDED_ORDER:
        metricType = MetricTypeEnum.SHOPIFY_REFUNDED_ORDER;
        break;
    }

    if (!metricType) throw new Error('no metric type defined');

    const metric = this.metricRepo
      .createQueryBuilder('metric')
      .where('metric.metricType =:metricType', { metricType });
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.IN_THE_LAST
    ) {
      if (!time.value1) throw new Error('time value1 is missing');
      const unit: dayjs.ManipulateType =
        time.delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const inTheLast = new Date(
        dayjs()
          .subtract(time.value1, unit)
          .format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      if (!(inTheLast instanceof Date))
        throw new Error('invalid inthelast date');
      metric.andWhere('metric.createdAt > :inTheLast', {
        inTheLast: inTheLast,
      });
    }
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BETWEEN
    ) {
      if (!time.value1) throw new Error('time value1 is missing');
      if (!time.value2) throw new Error('time value2 is missing');
      const unit: dayjs.ManipulateType =
        time.delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const between1 = new Date(
        dayjs()
          .subtract(time.value1, unit)
          .format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      const between2 = new Date(
        dayjs()
          .subtract(time.value1, unit)
          .format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );

      if (!(between1 instanceof Date) || !(between2 instanceof Date))
        throw new Error('invalid inthelast date');
      metric
        .andWhere('metric.createdAt >= :between1', {
          between1,
        })
        .andWhere('metric.createdAt <= :between2', {
          between2,
        });
    }
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BEFORE
    ) {
      if (!time.date1) throw new Error('time date1 is missing');
      metric.andWhere('metric.createdAt < :endDate', {
        endDate: time.date1,
      });
    }
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.AFTER
    ) {
      if (!time.date1) throw new Error('time date1 is missing');
      metric.andWhere('metric.createdAt > :startDate', {
        startDate: time.date1,
      });
    }
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.BETWEEN_DATES
    ) {
      if (!time.date1) throw new Error('time date1 is missing');
      if (!time.date2) throw new Error('time date2 is missing');
      metric
        .andWhere('metric.createdAt > :startDate', {
          startDate: time.date1,
        })
        .andWhere('metric.createdAt < :endDate ', {
          endDate: time.date1,
        });
    }
    if (
      time?.expression ===
      BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum.SINCE_STARTING_THIS_FLOW
    ) {
      const parentMetric = await this.metricRepo.findOne({
        where: { id: triggeredMetricId },
      });
      metric.andWhere('metric.createdAt > :startDateTime', {
        startDateTime: parentMetric?.createdAt,
      });
    }

    // over all time is also just getting the count, so thats not needed here
    const count = await metric.getCount();

    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.AT_LEAST_ONCE
    ) {
      if (count >= 1) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.ZERO_TIMES
    ) {
      if (count === 0) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.EQUALS
    ) {
      if (!inequlity.value) throw new Error('inequality value missing');
      if (count === inequlity.value) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.DOESNT_EQUAL
    ) {
      if (!inequlity.value) throw new Error('inequality value missing');
      if (count !== inequlity.value) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IS_AT_LEAST
    ) {
      if (!inequlity.value) throw new Error('inequality value missing');
      if (count >= inequlity.value) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IS_GREATER_THAN
    ) {
      if (!inequlity.value) throw new Error('inequality value missing');
      if (count > inequlity.value) {
        returnValue = true;
      }
    }
    if (
      inequlity?.expression ===
      BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum.IS_LESS_THAN
    ) {
      if (!inequlity.value) throw new Error('inequality value missing');
      if (count < inequlity.value) {
        returnValue = true;
      }
    }

    return returnValue;
  }

  async getMetricById(metricId: string): Promise<Metric | null> {
    const metric = await this.metricRepo.findOne({
      where: {
        id: metricId,
      },
    });
    return metric;
  }

  async getMetricTriggerFilter(
    metricId: string,
    triggerFilterType: BaseTriggerFilterTypeEnum | undefined,
    value: typeof BaseTriggerFilterValueUnion | undefined,
    dimension: BaseTriggerFilterDimensionEnum | undefined,
  ): Promise<boolean> {
    const metric = await this.getMetricById(metricId);

    if (!triggerFilterType) return false;

    if (metric?.data?.type === MetricTypeEnum.SHOPIFY_REFUNDED_ORDER) {
      if (dimension === BaseTriggerFilterDimensionEnum.DOLLAR_VALUE) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          (metric.data as MetricShopifyRefundedOrder).calculatedSubtotal,
        );
      }

      if (dimension === BaseTriggerFilterDimensionEnum.ITEM_COUNT) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          (metric.data as MetricShopifyRefundedOrder).refund_line_items.length,
        );
      }

      if (dimension === BaseTriggerFilterDimensionEnum.ITEMS) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          (metric.data as MetricShopifyRefundedOrder).refund_line_items.map(
            ({ line_item: { name } }) => name,
          ),
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.TOTAL_DISCOUNTS) {
        const discounts = (
          metric.data as MetricShopifyRefundedOrder
        ).refund_line_items.reduce(
          (a, { line_item: { total_discount } }) => a + Number(total_discount),
          0,
        );
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          discounts,
        );
      }
    }

    if (metric?.data?.type === MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT) {
      const metricData = metric.data as MetricShopifyOrderedProduct;
      if (dimension === BaseTriggerFilterDimensionEnum.NAME) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.name,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.PRODUCT_ID) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.product_id,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.QUANTITY) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.quantity,
        );
      }

      if (dimension === BaseTriggerFilterDimensionEnum.SKU) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.sku,
        );
      }

      if (
        dimension === BaseTriggerFilterDimensionEnum.VARIANT_NAME &&
        metricData.variant_title
      ) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.variant_title,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.VENDOR) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.vendor,
        );
      }

      if (dimension === BaseTriggerFilterDimensionEnum.DOLLAR_VALUE) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.price,
        );
      }
    }

    if (
      metric?.data?.type === MetricTypeEnum.SHOPIFY_PLACED_ORDER ||
      metric?.data?.type === MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED ||
      metric?.data?.type === MetricTypeEnum.SHOPIFY_FULFILLED_ORDER ||
      metric?.data?.type === MetricTypeEnum.SHOPIFY_CANCELLED_ORDER
    ) {
      const metricData = metric.data as MetricShopifyPlacedOrder;
      if (dimension === BaseTriggerFilterDimensionEnum.DISCOUNT_CODES) {
        console.log(
          metricData.discount_codes.map(({ code }) => code),
          value,
          'disoucnt code value',
        );

        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.discount_codes.map(({ code }) => code),
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.ITEM_COUNT) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.line_items.length,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.ITEMS) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.line_items.map(({ name }) => name),
        );
      }
      const shippingRate = metricData.shipping_lines[0]?.code;
      if (
        dimension === BaseTriggerFilterDimensionEnum.SHIPPING_RATE &&
        shippingRate
      ) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          shippingRate,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.SOURCE_NAME) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.source_name,
        );
      }

      if (dimension === BaseTriggerFilterDimensionEnum.TOTAL_DISCOUNTS) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.total_discounts,
        );
      }
      if (dimension === BaseTriggerFilterDimensionEnum.DOLLAR_VALUE) {
        return this.handleTriggerFilterType(
          triggerFilterType,
          value,
          metricData.total_price,
        );
      }
    }

    return false;
  }

  handleTriggerFilterType(
    triggerFilterType: BaseTriggerFilterTypeEnum,
    value: typeof BaseTriggerFilterValueUnion | undefined,
    data: string[] | string | number,
  ): boolean {
    if (
      triggerFilterType === BaseTriggerFilterTypeEnum.LIST &&
      Array.isArray(data)
    ) {
      return this.handleListTriggerFilter(
        value as BaseTriggerFilterListValue,
        data,
      );
    }
    if (triggerFilterType === BaseTriggerFilterTypeEnum.NUMBER) {
      if (typeof data === 'string' || typeof data === 'number') {
        return this.handleNumberTriggerFilter(
          value as BaseTriggerFilterNumberValue,
          Number(data),
        );
      }
    }
    if (triggerFilterType === BaseTriggerFilterTypeEnum.TEXT) {
      if (typeof data === 'string' || typeof data === 'number') {
        return this.handleTextTriggerFilter(
          value as BaseTriggerFilterTextValue,
          String(data),
        );
      }
    }
    if (triggerFilterType === BaseTriggerFilterTypeEnum.BOOLEAN) {
      return this.handleBooleanTriggerFilter(
        value as BaseTriggerFilterBooleanValue,
        data,
      );
    }
    return false;
  }

  handleListTriggerFilter(
    value: BaseTriggerFilterListValue,
    data: string[],
  ): boolean {
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.CONTAINS &&
      value.listValue
    ) {
      if (data.indexOf(value.listValue) > -1) {
        return true;
      }
    }
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.DOSENT_CONTAIN &&
      value.listValue
    ) {
      if (data.indexOf(value.listValue) === -1) {
        return true;
      }
    }
    if (
      value.listExpression === BaseTriggerFilterListValueExpressionEnum.IS_EMPTY
    ) {
      if (data.length === 0) {
        return true;
      }
    }
    if (
      value.listExpression ===
      BaseTriggerFilterListValueExpressionEnum.HAS_ATLEAST_ONE_ITEM
    ) {
      if (data.length >= 1) {
        return true;
      }
    }
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.HAS_ATLEAST &&
      value.listValue
    ) {
      if (data.length >= Number(value.listValue)) {
        return true;
      }
    }
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.HAS_ATMOST &&
      value.listValue
    ) {
      if (data.length <= Number(value.listValue)) {
        return true;
      }
    }
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.HAS_MORE_THAN &&
      value.listValue
    ) {
      if (data.length > Number(value.listValue)) {
        return true;
      }
    }
    if (
      value.listExpression ===
        BaseTriggerFilterListValueExpressionEnum.HAS_FEWER_THAN &&
      value.listValue
    ) {
      if (data.length < Number(value.listValue)) {
        return true;
      }
    }
    return false;
  }
  handleNumberTriggerFilter(
    value: BaseTriggerFilterNumberValue,
    data: number,
  ): boolean {
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.EQUALS &&
      data === value.numberValue
    ) {
      return true;
    }
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.DOSENT_EQUAL &&
      data !== value.numberValue
    ) {
      return true;
    }
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.IS_ATLEAST &&
      data >= Number(value.numberValue)
    ) {
      return true;
    }
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.IS_AT_MOST &&
      data <= Number(value.numberValue)
    ) {
      return true;
    }
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.IS_GREATER_THAN &&
      data > Number(value.numberValue)
    ) {
      return true;
    }
    if (
      value.numberExpression ===
        BaseTriggerFilterNumberValueExpressionEnum.IS_LESS_THAN &&
      data < Number(value.numberValue)
    ) {
      return true;
    }
    return false;
  }

  handleBooleanTriggerFilter(
    value: BaseTriggerFilterBooleanValue,
    data: any,
  ): boolean {
    if (value.booleanValue === true && data) {
      return true;
    }
    return false;
  }

  handleTextTriggerFilter(
    value: BaseTriggerFilterTextValue,
    data: string,
  ): boolean {
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.EQUALS &&
      data === value.textValue
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.DOSENT_EQUAL &&
      data !== value.textValue
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.CONTAINS &&
      value.textValue &&
      data.indexOf(value.textValue) > -1
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.DOSENT_CONTAIN &&
      value.textValue &&
      data.indexOf(value.textValue) === -1
    ) {
      return true;
    }
    if (
      value.textExpression === BaseTriggerFilterTextValueExpressionEnum.IS_IN &&
      value.textValue &&
      data.includes(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.IS_NOT_IN &&
      value.textValue &&
      !data.includes(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.STARTS_WITH &&
      value.textValue &&
      data.startsWith(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.DOSENT_START_WITH &&
      value.textValue &&
      !data.startsWith(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.ENDS_WITH &&
      value.textValue &&
      data.endsWith(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.DOSENT_ENDS_WITH &&
      value.textValue &&
      !data.endsWith(value.textValue)
    ) {
      return true;
    }
    if (
      value.textExpression ===
        BaseTriggerFilterTextValueExpressionEnum.IS_SET &&
      value.textValue &&
      value.textValue !== undefined &&
      value.textValue !== null
    ) {
      return true;
    }
    if (
      value.textExpression ===
      BaseTriggerFilterTextValueExpressionEnum.IS_NOT_SET
    ) {
      if (value.textValue === undefined || value.textValue === null) {
        return true;
      }
    }
    return false;
  }

  async handleDateTriggerFilter(
    metricType: MetricTypeEnum,
    dateExpression: BaseTriggerFilterDateValueExpressionEnum,
    value1: number,
    value2: number,
    date1: Date,
    date2: Date,
    delayType: DelayTypeEnum,
    dataKey: any,
    month: MonthTypeEnum,
  ): Promise<boolean> {
    const metric = this.metricRepo
      .createQueryBuilder('metric')
      .where('metric.metricType =:metricType', { metricType });
    if (
      dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_IN_THE_LAST
    ) {
      if (!value1) throw new Error('time value1 is missing');
      const unit: dayjs.ManipulateType =
        delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const inTheLast = new Date(
        dayjs().subtract(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      if (!(inTheLast instanceof Date))
        throw new Error('invalid inthelast date');
      metric.andWhere(`metric.data->>:key > :inTheLast`, {
        key: dataKey,
        inTheLast: inTheLast,
      });
    }
    if (
      dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_AT_LEAST
    ) {
      if (!value1) throw new Error('time value1 is missing');
      const unit: dayjs.ManipulateType =
        delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const isAtLeast = new Date(
        dayjs().subtract(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      if (!(isAtLeast instanceof Date))
        throw new Error('invalid is at least date');
      metric.andWhere(`metric.data->>:key <= :isAtLeast`, {
        key: dataKey,
        isAtLeast: isAtLeast,
      });
    }
    if (
      dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_IN_THE_NEXT
    ) {
      if (!value1) throw new Error('time value1 is missing');
      const unit: dayjs.ManipulateType =
        delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const isInTheNext = new Date(
        dayjs().add(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      if (!(isInTheNext instanceof Date))
        throw new Error('invalid is at least date');
      metric.andWhere(`metric.data->>:key <= :isInTheNext`, {
        key: dataKey,
        isInTheNext,
      });
    }

    if (
      dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_BETWEEN
    ) {
      if (!value1) throw new Error('time value1 is missing');
      if (!value2) throw new Error('time value2 is missing');
      const unit: dayjs.ManipulateType =
        delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const between1 = new Date(
        dayjs().subtract(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );
      const between2 = new Date(
        dayjs().subtract(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );

      if (!(between1 instanceof Date) || !(between2 instanceof Date))
        throw new Error('invalid inthelast date');
      metric
        .andWhere('metric.date->>:key >= :between1', {
          key: dataKey,
          between1,
        })
        .andWhere('metric.data->>:key <= :between2', {
          key: dataKey,
          between2,
        });
    }
    if (dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_BEFORE) {
      if (!date1) throw new Error('time date1 is missing');
      metric.andWhere('metric.data->>:key < :endDate', {
        key: dataKey,
        endDate: date1,
      });
    }
    if (dateExpression === BaseTriggerFilterDateValueExpressionEnum.IS_AFTER) {
      if (!date1) throw new Error('time date1 is missing');
      metric.andWhere('metric.data->>:key > :startDate', {
        key: dataKey,
        startDate: date1,
      });
    }
    if (
      dateExpression ===
      BaseTriggerFilterDateValueExpressionEnum.IS_BETWEEN_DATES
    ) {
      if (!date1) throw new Error('time date1 is missing');
      if (!date2) throw new Error('time date2 is missing');
      metric
        .andWhere('metric.data->>:key > :startDate', {
          key: dataKey,
          startDate: date1,
        })
        .andWhere('metric.data->>:key < :endDate ', {
          key: dataKey,
          endDate: date1,
        });
    }
    if (
      dateExpression === BaseTriggerFilterDateValueExpressionEnum.DAY_IS_TODAY
    ) {
      metric.andWhere('Date(metric.data->>:key) = CURDATE()', {
        key: dataKey,
      });
    }

    if (
      dateExpression ===
      BaseTriggerFilterDateValueExpressionEnum.DAY_IS_IN_THE_NEXT
    ) {
      const delay =
        delayType === DelayTypeEnum.DAYS
          ? 'DAY'
          : DelayTypeEnum.HOURS
          ? 'HOUR'
          : 'WEEK';
      metric.andWhere(
        'metric.data->>:key BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL :interval :delay)',
        {
          interval: value1,
          delay,
        },
      );
    }
    if (
      dateExpression ===
      BaseTriggerFilterDateValueExpressionEnum.DAY_IS_IN_THE_LAST
    ) {
      const unit: dayjs.ManipulateType =
        delayType === DelayTypeEnum.DAYS
          ? 'days'
          : DelayTypeEnum.HOURS
          ? 'hours'
          : 'weeks';
      const minimumDaysAgo = new Date(
        dayjs().subtract(value1, unit).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'),
      );

      metric.andWhere('metric.data->>:key  BETWEEN :minimumDaysAgo AND NOW()', {
        minimumDaysAgo,
      });
    }
    if (
      dateExpression ===
      BaseTriggerFilterDateValueExpressionEnum.DAY_IS_IN_THIS_MONTH
    ) {
      metric.andWhere('MONTH(metric.data->>:key) = MONTH(NOW())');
    }

    if (
      dateExpression ===
      BaseTriggerFilterDateValueExpressionEnum.DAY_IS_IN_MONTH_OFF
    ) {
      metric.andWhere('MONTH(metric.data->>:key) = :month', {
        month: month.valueOf(),
      });
    }

    // over all time is also just getting the count, so thats not needed here
    const count = await metric.getCount();
    if (count > 0) {
      return true;
    }
    return false;
  }

  async getMetricCountByUnitDays(
    unit: StartOfEndOfUnitType,
    metricType: MetricTypeEnum,
  ) {
    const { startOfDay, endOfDay } = getStarAndEndOfUnits(unit);

    const count = await this.metricRepo
      .createQueryBuilder('metric')
      .where('metric.metricType = :metricType', { metricType })
      .andWhere('metric.createdAt >= :startOfDay', {
        startOfDay,
      })
      .andWhere('metric.createdAt <= :endOfDay', {
        endOfDay,
      })
      .getCount();

    return count;
  }

  async getMetricValuByUnitDays(
    unit: StartOfEndOfUnitType,
    metricType: MetricTypeEnum,
  ): Promise<number> {
    const { startOfDay, endOfDay } = getStarAndEndOfUnits(unit);

    let sum = this.metricRepo
      .createQueryBuilder('metric')
      .where('metric.metricType = :metricType', { metricType });

    if (
      metricType === MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED_VALUE ||
      metricType === MetricTypeEnum.SHOPIFY_FULFILLED_ORDER_VALUE ||
      metricType === MetricTypeEnum.SHOPIFY_PLACED_ORDER_VALUE
    ) {
      sum = sum.select("SUM(metric.data ->> 'subtotal_price')", 'sum');
    }

    if (metricType === MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT_VALUE) {
      sum = sum.select("SUM(metric.data ->> 'price')", 'sum');
    }
    const data = await sum
      .andWhere('metric.createdAt >= :startOfDay', {
        startOfDay,
      })
      .andWhere('metric.createdAt <= :endOfDay', {
        endOfDay,
      })
      .getRawOne();

    return Number(data.sum);
  }

  async removeShopifyMetricData(storeId: string) {
    const metrics = await this.metricRepo.find({ where: { storeId } });
    await this.metricRepo.remove(metrics);
  }

  async getAutoaminEmailAnalytics(postId: string) {
    const delivered = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.EMAIL_DELIVERED,
        postId,
      },
    });
    const clickCount = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.EMAIL_LINK_CLICKED,
        postId,
      },
    });

    const openCount = await this.metricRepo.count({
      where: {
        metricType: MetricTypeEnum.EMAIL_OPENED,
        postId,
      },
    });
    return {
      delivered: delivered,
      clickRate: Math.trunc((clickCount / delivered) * 100),
      openRate: Math.trunc((openCount / delivered) * 100),
    };
  }
}
