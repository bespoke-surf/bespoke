import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../casl/casl.module';
import { EventModule } from '../event/event.module';
import { MetricModule } from '../metric/metirc.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { SubscriberListApiService } from './subscriber-list.api.service';
import { EmailConcent, SubscriberList } from './subscriber-list.entity';
import { SubscriberListListener } from './subscriber-list.listner';
import { SubscriberListResolver } from './subscriber-list.resolver';
import { SubscriberListService } from './subscriber-list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriberList, EmailConcent]),
    EventModule,
    WorkflowModule,
    MetricModule,
    CaslModule,
  ],
  providers: [
    SubscriberListService,
    SubscriberListResolver,
    SubscriberListListener,
    SubscriberListApiService,
  ],
  exports: [SubscriberListService, SubscriberListApiService],
})
export class SubscriberListModule {}
