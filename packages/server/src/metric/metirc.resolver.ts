import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { HasStoreAccessWithSubscriber } from '../guard/hasStoreAccessWithSubscriber';
import { HasStoreAccessWithWorkflow } from '../guard/hasStoreAccessWithWorkflow';
import { HasStoreAccessWithWorkflowState } from '../guard/hasStoreAccessWithWorkflowState';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { MetricTypeEnum } from './enum/metric-type.enum';
import { MetricService } from './metirc.service';
import { Metric } from './metric.entity';

@Resolver(() => Metric)
export class MetircResolver {
  constructor(private readonly metricService: MetricService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get placed order count',
  })
  getPlacedOrderCount(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getPlacedOrderCount(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get fulfilled order count',
  })
  getFulfilledOrderCount(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getFulfilledOrderCount(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get subscriber revenue',
  })
  getSubscriberRevenue(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getSubscriberRevenue(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get emails received count',
  })
  getEmailReceivedCount(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getEmailReceivedCount(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get emails opened count',
  })
  getEmailOpenedCount(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getEmailOpenedCount(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => Int, {
    nullable: true,
    description: 'get emails link clicked',
  })
  getEmailLinkClickedCount(
    @Args('subscriberId') subscriberId: string,
  ): Promise<number> {
    return this.metricService.getEmailLinkClickedCount(subscriberId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubscriber)
  @Query(() => [Metric], {
    nullable: true,
    description: 'get subscriber metrics',
  })
  getSubscriberMetrics(
    @Args('subscriberId') subscriberId: string,
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
    @Args('metricType', {
      nullable: true,
      type: () => MetricTypeEnum,
    })
    metriType: MetricTypeEnum,
    @Args('allMetric', { nullable: true }) allMetric: boolean,
  ): Promise<Metric[] | null> {
    return this.metricService.getSubscriberMetricsByType(
      subscriberId,
      take,
      skip,
      metriType,
      allMetric,
    );
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [Metric], {
    nullable: true,
    description: 'get subscriber metrics by type',
  })
  getMetricsByType(
    @Args('subdomain') subdomain: string,
    @Args('metricType', {
      nullable: true,
      type: () => MetricTypeEnum,
    })
    metriType: MetricTypeEnum,
    @Args('allMetric', { nullable: true }) allMetric: boolean,
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
  ): Promise<Metric[] | null> {
    return this.metricService.getMetricsByType(
      subdomain,
      take,
      skip,
      metriType,
      allMetric,
    );
  }
  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get email sent today',
  })
  getEmailSentTodayCount(
    @Args('subdomain') subdomain: string,
  ): Promise<number> {
    return this.metricService.getEmailSentTodayCount(subdomain);
  }
  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get email sent this month',
  })
  getEmailSentThisMonthCount(
    @Args('subdomain') subdomain: string,
  ): Promise<number> {
    return this.metricService.getEmailSentDuringPeriod(subdomain, 'month');
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'create a metric trigger',
  })
  createMetricTrigger(
    @Args('workflowId') workflowId: string,
    @Args('metricType', { type: () => MetricTypeEnum })
    metricType: MetricTypeEnum,
  ): Promise<WorkflowState | null> {
    return this.metricService.createMetricTrigger(metricType, workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update metric trigger',
  })
  updateMetricTrigger(
    @Args('workflowStateId') workflowStateId: string,
    @Args('metricType', { type: () => MetricTypeEnum })
    metricType: MetricTypeEnum,
  ): Promise<null> {
    return this.metricService.updateMetricTrigger(metricType, workflowStateId);
  }
}
