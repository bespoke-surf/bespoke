import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowTransition } from './workflow-transition.entity';
import { WorkflowTransitionService } from './workflow-transition.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowTransition])],
  providers: [WorkflowTransitionService],
  exports: [WorkflowTransitionService],
})
export class WorkflowTransitionModule {}
