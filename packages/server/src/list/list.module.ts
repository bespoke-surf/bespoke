import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyModule } from '../apiKey/apiKey.module';
import { CaslModule } from '../casl/casl.module';
import { EventModule } from '../event/event.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { WorkflowStateModule } from '../workflow-state/workflow-state.module';
import { ListApiService } from './list.apiService';
import { ListController } from './list.controller';
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
    CaslModule,
    ApiKeyModule,
  ],
  providers: [ListResolver, ListService, ListListener, ListApiService],
  exports: [ListService],
  controllers: [ListController],
})
export class ListModule {}
