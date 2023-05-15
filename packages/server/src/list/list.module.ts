import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { WorkflowStateModule } from '../workflow-state/workflow-state.module';
import { List } from './list.entity';
import { ListListener } from './list.listner';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    SubscriberListModule,
    EventModule,
    WorkflowStateModule,
  ],
  providers: [ListResolver, ListService, ListListener],
  exports: [ListService],
})
export class ListModule {}
