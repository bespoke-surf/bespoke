import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowStateModule } from '../workflow-state/workflow-state.module';
import { MetircResolver } from './metirc.resolver';
import { MetricService } from './metirc.service';
import { Metric } from './metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metric]), WorkflowStateModule],
  providers: [MetricService, MetircResolver],
  exports: [MetricService],
})
export class MetricModule {}
