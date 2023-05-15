import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DelayTypeEnum } from '../enum/delaytype.enum';
import { List } from '../list/list.entity';
import { MetricTypeEnum } from '../metric/enum/metric-type.enum';
import { WorkflowTransitionService } from '../workflow-transition/workflow-transition.service';
import { CreateConditionalSplitNodeInput } from './dto/createConditionalStateInput';
import { CreateDelayStateInput } from './dto/createDelayState';
import { CreateSendEmailNodeInput } from './dto/createSendEmailState';
import { CreateTriggerSplitNodeInput } from './dto/createTriggersplitNodeInput';
import { UpdateConditionalSplitStateInput } from './dto/updateConditionalStateInput';
import { UpdateDelayStateInput } from './dto/updateDelayState';
import { UpdateSendEmailStateInput } from './dto/updateSendEmailState';
import { UpdateTriggerSplitStateInput } from './dto/updateTriggerSplitStateInput';
import { WorkflowActivityType } from './enum/workflowActivityType.enum';
import { WorkflowStateType } from './enum/workflowStateType.enum';
import type { WorkflowStateSendEmailActivityValue } from './type/stateEmailValue';
import { WorkflowState } from './workflow-state.entity';

@Injectable()
export class WorkflowStateService {
  constructor(
    @InjectRepository(WorkflowState)
    private readonly workflowStateRepo: Repository<WorkflowState>,
    private readonly workflowTransitionService: WorkflowTransitionService,
  ) {}

  async getWorkflowStates(workflowId: string): Promise<WorkflowState[]> {
    return await this.workflowStateRepo.find({
      where: { workflowId },
    });
  }

  async getWorkflowState(
    workflowStateId: string,
  ): Promise<WorkflowState | null> {
    const state = await this.workflowStateRepo.findOne({
      where: { id: workflowStateId },
    });
    return state ?? null;
  }

  async getWorkflowStateWithType(
    workflowId: string,
    workflowStateType: WorkflowStateType,
  ): Promise<WorkflowState | null> {
    return await this.workflowStateRepo.findOne({
      where: {
        workflowId,
        workflowStateType,
      },
    });
  }

  async getWorkflowStatesWithListId(
    listId: string,
    activityType: WorkflowActivityType,
  ): Promise<WorkflowState[] | null> {
    const state = await this.workflowStateRepo
      .createQueryBuilder('workflowState')
      .where('workflowState.value @> :value', { value: { listId } })
      .andWhere('workflowState.workflowStateType =:type', {
        type: WorkflowStateType.START,
      })
      .andWhere('workflowState.workflowActivityType = :activityType', {
        activityType,
      })
      .getMany();
    return state ?? null;
  }

  async getWorkflowStatesWithMetricType(
    metricType: MetricTypeEnum,
    activityType: WorkflowActivityType,
  ): Promise<WorkflowState[] | null> {
    const state = await this.workflowStateRepo
      .createQueryBuilder('workflowState')
      .where('workflowState.value @> :value', { value: { metricType } })
      .andWhere('workflowState.workflowStateType = :type', {
        type: WorkflowStateType.START,
      })
      .andWhere('workflowState.workflowActivityType = :activityType', {
        activityType,
      })
      .getMany();
    return state ?? null;
  }

  async createListWorkflowState(list: List, workflowId: string) {
    const state = await this.workflowStateRepo.save({
      name: list.name,
      workflowId,
      workflowStateType: WorkflowStateType.START,
      value: {
        listId: list.id,
      },
      workflowActivityType: WorkflowActivityType.LIST_TRIGGER,
    });

    return state;
  }

  async createMetricState(metricType: MetricTypeEnum, workflowId: string) {
    const state = await this.workflowStateRepo.save({
      name: metricType,
      workflowId,
      workflowStateType: WorkflowStateType.START,
      value: {
        metricType,
      },
      workflowActivityType: WorkflowActivityType.METRIC_TRIGGER,
    });

    return state;
  }

  async updateListWorkflowState(list: List, workflowStateId: string) {
    await this.workflowStateRepo.update(workflowStateId, {
      value: {
        listId: list.id,
      },
      name: list.name,
    });
  }

  async updateMetricWorkflowState(
    metricType: MetricTypeEnum,
    workflowStateId: string,
  ) {
    await this.workflowStateRepo.update(workflowStateId, {
      value: {
        metricType,
      },
      name: metricType,
    });
  }

  async getConvertedNames(
    delayInMilliseconds: number,
    delayType: DelayTypeEnum,
  ): Promise<string> {
    const convertedDays = delayInMilliseconds / 86400000;
    const convertedHours = delayInMilliseconds / 3600000;
    const convertedMinutes = delayInMilliseconds / 60000;

    const name =
      delayType === DelayTypeEnum.DAYS
        ? `${convertedDays} day(s)`
        : delayType === DelayTypeEnum.HOURS
        ? `${convertedHours} hour(s)`
        : `${convertedMinutes} minute(s)`;
    return name;
  }

  async createDelayState(
    input: CreateDelayStateInput,
  ): Promise<WorkflowState | null> {
    const { workflowId, ...rest } = input;

    if (!input.delayInMilliseconds) return null;

    const name = await this.getConvertedNames(
      input.delayInMilliseconds,
      input.delayType,
    );

    const updatePrviousStaet = await this.updateStateToNormal(
      input.workflowStateId,
    );

    if (!updatePrviousStaet) return null;

    const state = await this.workflowStateRepo.save({
      workflowId,
      workflowStateType: WorkflowStateType.COMPLETE,
      workflowActivityType: WorkflowActivityType.DELAY,
      value: {
        ...rest,
      },
      name,
    });

    await this.workflowTransitionService.createTranstion({
      nextStateId: state.id,
      workflowId,
      workflowStateId: input.workflowStateId,
      otherWise: input.otherWise,
    });

    return state ?? null;
  }

  async createConditionalSplitNode(
    input: CreateConditionalSplitNodeInput,
  ): Promise<WorkflowState | null> {
    const { workflowId, workflowStateId, otherWise } = input;

    const updatePrviousStaet = await this.updateStateToNormal(
      input.workflowStateId,
    );

    if (!updatePrviousStaet) return null;

    const state = await this.workflowStateRepo.save({
      workflowId,
      workflowActivityType: WorkflowActivityType.CONDITIONAL_SPLIT,
      workflowStateType: WorkflowStateType.COMPLETE,
      name: 'Conditional Split',
      value: {
        flowFilter: input.flowFilter,
      },
    });

    await this.workflowTransitionService.createTranstion({
      nextStateId: state.id,
      workflowId,
      workflowStateId,
      otherWise,
    });

    return state ?? null;
  }

  async createTriggerSplitNode(
    input: CreateTriggerSplitNodeInput,
  ): Promise<WorkflowState | null> {
    const { workflowId, workflowStateId, otherWise } = input;

    const updatePrviousStaet = await this.updateStateToNormal(
      input.workflowStateId,
    );

    if (!updatePrviousStaet) return null;

    const state = await this.workflowStateRepo.save({
      workflowId,
      workflowActivityType: WorkflowActivityType.TRIGGER_SPLIT,
      workflowStateType: WorkflowStateType.COMPLETE,
      name: 'Trigger Split',
      value: {
        triggerFilter: input.triggerFilter,
      },
    });

    await this.workflowTransitionService.createTranstion({
      nextStateId: state.id,
      workflowId,
      workflowStateId,
      otherWise,
    });

    return state ?? null;
  }

  async updateConditionalSplitState(
    input: UpdateConditionalSplitStateInput,
  ): Promise<WorkflowState | null> {
    const { workflowStateId, ...rest } = input;

    await this.workflowStateRepo.update(workflowStateId, {
      value: {
        ...rest,
      },
    });

    return null;
  }
  async updateTriggerSplitState(
    input: UpdateTriggerSplitStateInput,
  ): Promise<WorkflowState | null> {
    const { workflowStateId, ...rest } = input;

    await this.workflowStateRepo.update(workflowStateId, {
      value: {
        ...rest,
      },
    });

    return null;
  }

  async updateDelayState(input: UpdateDelayStateInput): Promise<null> {
    if (!input.delayInMilliseconds) return null;

    const name = await this.getConvertedNames(
      input?.delayInMilliseconds,
      input.delayType,
    );
    await this.workflowStateRepo.update(input.workflowStateId, {
      value: {
        delayInMilliseconds: input.delayInMilliseconds,
        delayType: input.delayType,
      },
      name,
    });
    return null;
  }

  async updateStateToNormal(
    workflowStateId: string,
  ): Promise<WorkflowState | null> {
    const state = await this.workflowStateRepo.findOne({
      where: { id: workflowStateId },
    });

    if (state?.workflowStateType != WorkflowStateType.START) {
      await this.workflowStateRepo.update(workflowStateId, {
        workflowStateType: WorkflowStateType.NORMAL,
      });
    }

    const newState = await this.workflowStateRepo.findOne({
      where: { id: workflowStateId },
    });
    return newState ?? null;
  }

  async deleteWorkflowState(workflowStateId: string): Promise<boolean> {
    const deleted = await this.workflowStateRepo.delete(workflowStateId);
    if (deleted?.affected) {
      return true;
    }
    return false;
  }

  async createSendEmailNode(
    input: CreateSendEmailNodeInput,
  ): Promise<WorkflowState | null> {
    const updatePrviousStaet = await this.updateStateToNormal(
      input.workflowStateId,
    );

    if (!updatePrviousStaet) return null;
    const state = await this.workflowStateRepo.save({
      name: input.subject,
      workflowStateType: WorkflowStateType.COMPLETE,
      workflowActivityType: WorkflowActivityType.SEND_EMAIL,
      workflowId: input.workflowId,
      value: {
        type: input.type,
        design: input.design,
        html: input.html,
      } satisfies WorkflowStateSendEmailActivityValue,
    });

    await this.workflowTransitionService.createTranstion({
      nextStateId: state.id,
      workflowId: input.workflowId,
      workflowStateId: input.workflowStateId,
      otherWise: input.otherWise,
    });

    return state;
  }

  async updateSendEmailState(input: UpdateSendEmailStateInput): Promise<null> {
    await this.workflowStateRepo.update(input.workflowStateId, {
      value: {
        type: input.type,
        html: input.html,
        design: input.design,
      },
      name: input.subject,
    });
    return null;
  }

  async deleteWorkflowTransition(id: string): Promise<null> {
    await this.workflowTransitionService.deleteTranstion(id);
    return null;
  }

  async createReplicWorkflowState(
    input: Partial<WorkflowState>,
  ): Promise<WorkflowState> {
    return await this.workflowStateRepo.save({
      ...input,
    });
  }
}
