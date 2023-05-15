import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowTransitionModule } from '../workflow-transition/workflow-transition.module';
import { WorkflowState } from './workflow-state.entity';
import { WorkflowStateResolver } from './workflow-state.resolver';
import { WorkflowStateService } from './workflow-state.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowState]),
    WorkflowTransitionModule,
  ],
  providers: [WorkflowStateService, WorkflowStateResolver],
  exports: [WorkflowStateService],
})
export class WorkflowStateModule {}
