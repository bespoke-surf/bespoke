import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Redis } from 'ioredis';
import {
  EMAIL_HEADER_POST_ID_KEY,
  EMAIL_HEADER_UNSUBSCRIBE_ID_KEY,
  UNSUBSCRIBE_ID_PREFIX,
  USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE,
} from '../../constants';
import { MetricService } from '../../metric/metirc.service';
import { PostService } from '../../post/post.service';
import { SubscriberListService } from '../../subscriber-list/subscriber-list.service';
import { SubscriberEmailStatus } from '../../subscriber/enum/emailStatus.enum';
import { SubscriberService } from '../../subscriber/subscriber.service';
import { UserEmailDeliveryStatusService } from '../user.emailDeliveryStatus';

export interface UserStoreSnsEmailMetricQueueData {
  data: any | { Message: string };
}

export type EmailWebhookEvent =
  | 'processed'
  | 'delivered'
  | 'open'
  | 'click'
  | 'dropped'
  | 'spamreport'
  | 'unsubscribe'
  | 'bounced';

@Processor(USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE)
export class UserStoreSnsEmailMetricWebhookQueue {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly subscriberListService: SubscriberListService,
    private readonly userEmailDeliveryStatusService: UserEmailDeliveryStatusService,
    private readonly metricService: MetricService,
    private readonly postService: PostService,
    @InjectRedis() private redis: Redis,
  ) {}

  @Process()
  async transcode(job: Job<UserStoreSnsEmailMetricQueueData>) {
    try {
      const message = JSON.parse(JSON.parse(job.data.data)['Message']);
      const eventType = message.eventType;
      const headers: { name: string; value: string }[] = message.mail.headers;

      let event: EmailWebhookEvent | undefined = undefined;
      /*
    Send = processed
    Delivery = delivered
    Open = open
    Click = click
    DeliveryDelay, Rejects = dropped
    Bounce = bounce
    Complaint = spamreport
    Subscription = unsubscribe
    */
      switch (eventType) {
        case 'Send':
          event = 'processed';
          break;
        case 'Delivery':
          event = 'delivered';
          break;
        case 'Open':
          event = 'open';
          break;
        case 'Click':
          event = 'click';
          break;
        case 'DeliveryDelay':
          event = 'dropped';
          break;
        case 'Reject':
          event = 'dropped';
          break;
        case 'Bounce':
          event = 'bounced';
          break;
        case 'Complaint':
          event = 'spamreport';
          break;
        case 'Subscription':
          event = 'unsubscribe';
          break;
        default:
          event = undefined;
          break;
      }
      const headerUnsubscribeId = headers.find(
        ({ name }) => name === EMAIL_HEADER_UNSUBSCRIBE_ID_KEY,
      );
      const headerPost = headers.find(
        ({ name }) => name === EMAIL_HEADER_POST_ID_KEY,
      );

      const data = await this.redis.get(
        `${UNSUBSCRIBE_ID_PREFIX}${headerUnsubscribeId?.value}`,
      );

      if (!data) return;

      const { subscriberId, listId } = JSON.parse(data);

      const postId = headerPost?.value;
      const clickData = message.click;

      if (
        event === 'open' ||
        event === 'delivered' ||
        event === 'click' ||
        event === 'processed'
      ) {
        if (!listId || !subscriberId || !postId) return;

        const subscriber = await this.subscriberService.getSubscriber(
          subscriberId,
        );

        const post = await this.postService.getPost(postId, true);

        if (event === 'processed' && post?.title) {
          await this.metricService.createEmailSentMetric(
            postId,
            subscriberId,
            listId,
            post?.title,
            post.storeId,
          );
        }

        if (event === 'open' && post?.title) {
          await this.metricService.createEmailOpenedMetric(
            postId,
            subscriberId,
            listId,
            post.title,
            post.storeId,
          );
        }

        if (event === 'click' && clickData) {
          await this.metricService.createEmailLinkClickedMetric(
            postId,
            subscriberId,
            listId,
            clickData,
            subscriber?.storeId ?? '',
          );
        }

        if (event === 'delivered' && post?.title) {
          await this.metricService.createEmailDeliveredMetric(
            postId,
            subscriberId,
            listId,
            post.title,
            post?.storeId,
          );
        }
      }

      if (
        event === 'bounced' ||
        event === 'spamreport' ||
        event === 'unsubscribe' ||
        event === 'dropped'
      ) {
        if (!subscriberId) return;

        const subscriber = await this.subscriberService.getSubscriber(
          subscriberId,
        );
        if (!subscriber) return;

        // do not unsubscribe for dropped
        if (event === 'dropped') {
          await this.metricService.createEmailDropped({
            postId,
            subscriberId,
            listId,
            storeId: subscriber?.storeId ?? '',
          });
          const emailDeliveryStatus =
            await this.userEmailDeliveryStatusService.getEmailDeliveryStatus(
              subscriber?.userId,
            );
          if (emailDeliveryStatus) {
            await this.userEmailDeliveryStatusService.incrementEmailDeliverySoftBounceCount(
              emailDeliveryStatus?.id,
            );
          }
        }

        if (headerUnsubscribeId?.value && listId) {
          await this.subscriberListService.unsubscrbeFromList(
            headerUnsubscribeId.value,
            listId,
          );
        }

        if (event === 'bounced') {
          await this.metricService.createEmailBounced({
            postId,
            subscriberId,
            listId,
            storeId: subscriber?.storeId ?? '',
          });
          const emailDeliveryStatus =
            await this.userEmailDeliveryStatusService.getEmailDeliveryStatus(
              subscriber?.userId,
            );
          if (emailDeliveryStatus) {
            await this.userEmailDeliveryStatusService.emailDeliveryStatusToBounced(
              emailDeliveryStatus.id,
            );
          }
        }

        if (event === 'spamreport') {
          await this.metricService.createEmailMarkedAsSapm({
            postId,
            subscriberId,
            listId,
            storeId: subscriber?.storeId ?? '',
          });
          //add marked as spam here
          this.subscriberService.updateSubscriberEmailStatus(
            subscriber?.id,
            SubscriberEmailStatus.MARKED_AS_SPAM,
          );
        }

        if (event === 'unsubscribe') {
          await this.metricService.createEmailUnsubscribed({
            subscriberId,
            listId,
            storeId: subscriber?.storeId,
            postId,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
