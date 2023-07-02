import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from '../about/about.module';
import { BillingModule } from '../billing/billing.module';
import {
  STORE_DIALY_CRON_QUEUE,
  STORE_PRODUCT_UPLOAD_QUEUE,
  STORE_QUARTERLY_CRON_QUEUE,
  STORE_QUEST_QUEUE,
  STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE,
  STORE_WEEKLY_CRON_QUEUE,
  STORE_WORKFLOW_QUEUE,
} from '../constants';
import { CreditModule } from '../credit/credit.module';
import { EventModule } from '../event/event.module';
import { IntegrationModule } from '../integration/integration.module';
import { ItemModule } from '../item/item.module';
import { ListModule } from '../list/list.module';
import { MetricModule } from '../metric/metirc.module';
import { NotificationModule } from '../notification/notification.module';
import { PostListModule } from '../post-list/post-list.module';
import { PostModule } from '../post/post.module';
import { ProductModule } from '../product/product.module';
import { SesModule } from '../ses/ses.module';
import { ShopifyModule } from '../shopify/shopify.module';
import { SignupFormModule } from '../signup-form/signup-form.module';
import { SseModule } from '../sse/sse.module';
import { StoreItemModule } from '../store-item/store-item.module';
import { StripeModule } from '../stripe/stripe.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { WorkflowStateModule } from '../workflow-state/workflow-state.module';
import { WorkflowTransitionModule } from '../workflow-transition/workflow-transition.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { StoreControllerController } from './controllers/store.controller';
import { StoreStripeController } from './controllers/stripe.controller';
import { StoreProductUploadProcessor } from './queues/store.productUpload';
import { StoreSendEmailProcessor } from './queues/store.sendEmailToSubscriberListQueue';
import { StoreListWorkflowQueueProcessor } from './queues/store.workflowQueue';
import { Contact, DisplayPicture, Store } from './store.entity';
import { StoreListener } from './store.listner';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: STORE_QUEST_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_PRODUCT_UPLOAD_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_WORKFLOW_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_DIALY_CRON_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_WEEKLY_CRON_QUEUE,
    }),
    BullModule.registerQueue({
      name: STORE_QUARTERLY_CRON_QUEUE,
    }),
    TypeOrmModule.forFeature([Store, DisplayPicture, Contact]),
    AboutModule,
    PostModule,
    PostListModule,
    ProductModule,
    ShopifyModule,
    EventModule,
    SseModule,
    SubscriberListModule,
    SubscriberModule,
    IntegrationModule,
    WorkflowStateModule,
    WorkflowModule,
    WorkflowTransitionModule,
    MetricModule,
    SignupFormModule,
    ListModule,
    StripeModule,
    BillingModule,
    NotificationModule,
    CreditModule,
    ItemModule,
    StoreItemModule,
    SesModule,
  ],
  providers: [
    StoreResolver,
    StoreService,
    StoreListener,
    StoreProductUploadProcessor,
    StoreSendEmailProcessor,
    StoreListWorkflowQueueProcessor,
  ],
  exports: [StoreService],
  controllers: [StoreControllerController, StoreStripeController],
})
export class StoreModule {}
