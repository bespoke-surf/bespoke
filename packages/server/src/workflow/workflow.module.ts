import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { WorkflowStateModule } from '../workflow-state/workflow-state.module';
import { WorkflowTransitionModule } from '../workflow-transition/workflow-transition.module';
import { Workflow } from './workflow.entity';
import { WorkflowResolver } from './workflow.resolver';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workflow]),
    EventModule,
    WorkflowStateModule,
    WorkflowTransitionModule,
  ],
  providers: [WorkflowResolver, WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
