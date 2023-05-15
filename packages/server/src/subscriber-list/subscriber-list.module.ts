import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { MetricModule } from '../metric/metirc.module';
import { WorkflowModule } from '../workflow/workflow.module';
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
  ],
  providers: [
    SubscriberListService,
    SubscriberListResolver,
    SubscriberListListener,
  ],
  exports: [SubscriberListService],
  controllers: [],
})
export class SubscriberListModule {}
