import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  USER_CUSTOMER_UPLOAD_QUEUE,
  USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE,
  USER_STORE_UPLOAD_CSV_FILE_QUEUE,
} from '../constants';
import { EventModule } from '../event/event.module';
import { ListModule } from '../list/list.module';
import { MetricModule } from '../metric/metirc.module';
import { NotificationModule } from '../notification/notification.module';
import { PostModule } from '../post/post.module';
import { PosthogModule } from '../posthog/posthog.module';
import { ProductModule } from '../product/product.module';
import { SesModule } from '../ses/ses.module';
import { ShopifyModule } from '../shopify/shopify.module';
import { SignupFormModule } from '../signup-form/signup-form.module';
import { SseModule } from '../sse/sse.module';
import { StoreModule } from '../store/store.module';
import { StripeModule } from '../stripe/stripe.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { UserController } from './controller/user.controller';
import { UserStoreSnsController } from './controller/user.storeSns.controller';
import { UserCustomerUploadProcessor } from './queue/shopify.customerUpload';
import { UserStoreSnsEmailMetricWebhookQueue } from './queue/sns-webhookQueue';
import { UserStoreUploadCSVFileQueue } from './queue/uploadCsvFileQueue';
import { UserEmailDeliveryStatusService } from './user.emailDeliveryStatus';
import { User, UserEmailDeliveryStatus } from './user.entity';
import { UserListener } from './user.listner';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: USER_CUSTOMER_UPLOAD_QUEUE,
    }),
    BullModule.registerQueue({
      name: USER_STORE_UPLOAD_CSV_FILE_QUEUE,
    }),
    BullModule.registerQueue({
      name: USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE,
    }),
    TypeOrmModule.forFeature([User, UserEmailDeliveryStatus]),
    EventModule,
    SubscriberListModule,
    StoreModule,
    SubscriberModule,
    ShopifyModule,
    SseModule,
    SignupFormModule,
    ListModule,
    StripeModule,
    NotificationModule,
    PosthogModule,
    ProductModule,
    SesModule,
    MetricModule,
    PostModule,
  ],
  providers: [
    UserResolver,
    UserRepository,
    UserService,
    UserListener,
    UserCustomerUploadProcessor,
    UserStoreUploadCSVFileQueue,
    UserEmailDeliveryStatusService,
    UserStoreSnsEmailMetricWebhookQueue,
  ],
  exports: [UserService],
  controllers: [UserController, UserStoreSnsController],
})
export class UserModule {}
