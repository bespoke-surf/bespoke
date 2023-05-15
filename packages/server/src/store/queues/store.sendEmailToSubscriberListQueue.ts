import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Redis } from 'ioredis';
import Mail from 'nodemailer/lib/mailer';
import { BillingService } from '../../billing/billing.service';
import { STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE } from '../../constants';
import { SesService } from '../../ses/ses.service';
import { EmailConcentState } from '../../subscriber-list/enum/emailConcentState.enum';
import { SubscriberListService } from '../../subscriber-list/subscriber-list.service';
import { SubscriberEmailStatus } from '../../subscriber/enum/emailStatus.enum';
import { EnvironmentVariables } from '../../types';
import { EmailDeliveryStatus } from '../../user/enum/emailDeliveryStatus.enum';
import { StoreSendEmailData } from '../dto/sendgridSendEmailData';
import { EmailSentLimitStatus } from '../enum/emailSentLimitStatus.enum';
import { StoreService } from '../store.service';
import { smptpSubscriberListEmail } from './emailThings';
// sends email to subscribers in a list
@Processor(STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE)
export class StoreSendEmailProcessor {
  constructor(
    private sesService: SesService,
    private subscriberListService: SubscriberListService,
    private configService: ConfigService<EnvironmentVariables>,
    private billingService: BillingService,
    private storeService: StoreService,
    @InjectRedis() private redis: Redis,
  ) {}

  @Process()
  async transcode(job: Job<StoreSendEmailData>) {
    try {
      const listId = job.data.listId;
      const post = job.data.postData;

      const subscriberLists =
        await this.subscriberListService.getSubscriberListsToSendEmail(listId);

      if (!subscriberLists) throw new Error('no subscriber list');

      const subscribers = subscriberLists
        .filter(
          (sublist) =>
            sublist.subscriber.user.userEmailDeliveryStatus
              .emailDeliveryStatus === EmailDeliveryStatus.SUBSCRIBED,
        )
        .filter(
          (sublist) =>
            sublist.subscriber.emailStatus === SubscriberEmailStatus.SUBSCRIBED,
        )
        .filter(
          (sublist) =>
            sublist.emailConcent.state === EmailConcentState.SUBSCRIBED,
        )
        .map((sublist) => sublist.subscriber);

      const host = this.configService.get('HOST');
      const frontEndHost = this.configService.get('FRONTEND_HOST');
      const frontEndHostProtocol = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );

      if (!post.store.subdomain) throw new Error('missing subdomin');
      const billing = await this.billingService.getStoreBilling(
        post.store.subdomain,
      );

      if (!billing)
        throw new Error(
          'missing billing from send email to subscriber list queue',
        );

      const store = await this.storeService.getStore(post.storeId);
      if (!store) throw new Error();
      const emailSendStatus = await this.storeService.getEmailSentLimitStatus(
        store,
      );

      if (emailSendStatus === EmailSentLimitStatus.DISALLOWED) {
        throw new Error('email sent limit status dissalowed');
      }

      const mail: Mail.Options[] = subscribers.map((subscriber) => {
        return smptpSubscriberListEmail({
          frontEndHost,
          frontEndHostProtocol,
          host,
          listId,
          postWithStoreAndContact: post,
          subscriber,
          redis: this.redis,
        });
      });

      await this.sesService.send(mail);
      return Promise.resolve();
      // return this.sendgridService.sendMultiple(mail);
    } catch (error) {
      return Promise.reject(new Error(JSON.stringify(error)));
    }
  }
}
