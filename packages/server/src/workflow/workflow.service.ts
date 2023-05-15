import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { WorkflowActivityType } from '../workflow-state/enum/workflowActivityType.enum';
import { WorkflowStateListTriggerActivityValue } from '../workflow-state/type/stateListValue';
import { WorkflowStateService } from '../workflow-state/workflow-state.service';
import { WorkflowTransitionService } from '../workflow-transition/workflow-transition.service';
import { CreateNewDelayNodeInput } from './dto/createNewDelayNodeInput';
import { WorkflowNodeType } from './enum/workflowNodeType.enum';
import { WorkflowStatus } from './enum/workflowStatus.enum';
import { BaseConditionalFilter } from './type/baseCoindtionalFilter/baseConditionalFilter';
import { BaseTriggerFilter } from './type/baseTriggerFilter/baseTriggerFilter';
import { WorkflowEdge } from './type/edgeType';
import { WorkflowNode } from './type/nodeType';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepo: Repository<Workflow>,
    private eventEmitter: EventEmitter2,
    private workflowStateService: WorkflowStateService,
    private workflowTransitionService: WorkflowTransitionService,
  ) {}

  async emitEvent(eventName: string, workflowId: string) {
    const getPost = await this.workflowRepo.findOne({
      where: { id: workflowId },
      relations: { store: { user: true } },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async getNode(workflow: Workflow): Promise<WorkflowNode[] | null> {
    const workflowState = await this.workflowStateService.getWorkflowStates(
      workflow.id,
    );

    const node: WorkflowNode[] = [];

    for (const state of workflowState) {
      const data: WorkflowNode = {
        data: {
          id: state.id,
          name: state.name,
          workflowStateType: state.workflowStateType,
          workflowActivityType: state.workflowActivityType,
          value: state.value,
        },
        id: state.id,
        position: { x: 0, y: 0 },
        type:
          state.workflowActivityType === WorkflowActivityType.LIST_TRIGGER ||
          state.workflowActivityType === WorkflowActivityType.METRIC_TRIGGER
            ? WorkflowNodeType.TriggerNode
            : state.workflowActivityType === WorkflowActivityType.DELAY
            ? WorkflowNodeType.DelayNode
            : state.workflowActivityType === WorkflowActivityType.SEND_EMAIL
            ? WorkflowNodeType.SendEmailNode
            : state.workflowActivityType ===
              WorkflowActivityType.CONDITIONAL_SPLIT
            ? WorkflowNodeType.ConditionalSplitNode
            : state.workflowActivityType === WorkflowActivityType.TRIGGER_SPLIT
            ? WorkflowNodeType.TriggerSplitNode
            : WorkflowNodeType.TriggerNodeDisabled,
      };

      node.push(data);
    }

    return node;
  }

  async getEdge(workflow: Workflow): Promise<WorkflowEdge[] | null> {
    const workflowtransitons =
      await this.workflowTransitionService.getWorflowTransitons(workflow.id);

    const edge: WorkflowEdge[] = workflowtransitons.map((transition) => {
      return {
        id: transition.id,
        source: transition.workflowStateId,
        target: transition.nextStateId,
        sourceHandle: transition.otherWise ? 'b' : 'a',
      };
    });
    return edge;
  }

  async createWorkflow(storeId: string): Promise<Workflow | null> {
    const workflow = await this.workflowRepo.save({
      name: 'New Workflow',
      storeId,
    });
    return workflow;
  }

  async incrementReplicationCount(workflowId: string): Promise<null> {
    const workflow = await this.workflowRepo.findOne({
      where: {
        id: workflowId,
      },
    });
    if (!workflow) return null;
    await this.workflowRepo.update(workflow.id, {
      replicationCount: (workflow?.replicationCount ?? 0) + 1,
    });
    return null;
  }

  async getWorkflows(subdomain: string): Promise<Workflow[]> {
    const workflows = await this.workflowRepo.find({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return workflows;
  }

  async getWorkflow(workflowId: string): Promise<Workflow | null> {
    const workflows = await this.workflowRepo.findOne({
      where: {
        id: workflowId,
      },
      relations: {
        workflowState: true,
      },
    });
    return workflows;
  }

  async deleteWorkflow(workflowId: string): Promise<Workflow | null> {
    await this.workflowRepo.delete(workflowId);
    return null;
  }

  async updateWorkflowName(
    workflowId: string,
    name: string,
  ): Promise<Workflow | null> {
    await this.workflowRepo.update(workflowId, {
      name,
    });
    return null;
  }

  async turnOnWorkflow(workflowId: string): Promise<Workflow | null> {
    const workflow = await this.workflowRepo.findOne({
      where: { id: workflowId },
    });

    if (workflow?.public) return null;
    // if its public, you cannot make workflow public

    await this.workflowRepo.update(workflowId, {
      workflowStatus: WorkflowStatus.LIVE,
    });

    return null;
  }

  async turnOffWorkflow(workflowId: string): Promise<Workflow | null> {
    await this.workflowRepo.update(workflowId, {
      workflowStatus: WorkflowStatus.INACTIVE,
    });

    return null;
  }

  async createNewDelayNode(input: CreateNewDelayNodeInput): Promise<null> {
    const { workflowStateId, delayInMilliseconds, delayType, workflowId } =
      input;

    await this.workflowStateService.createDelayState({
      workflowId,
      delayType,
      delayInMilliseconds,
      workflowStateId,
      otherWise: input.otherWise,
    });

    return null;
  }

  async deleteWorkflowNode(workflowStateId: string): Promise<null> {
    const sourceTransitionLines =
      await this.workflowTransitionService.getWorkflowTransitionsOfNextState(
        workflowStateId,
      );

    const targetTransitionLines =
      await this.workflowTransitionService.getWorkflowTransitionsOfStates(
        workflowStateId,
      );

    const deltringLines = [];

    for (const transiton of sourceTransitionLines) {
      deltringLines.push(
        this.workflowTransitionService.deleteTranstion(transiton.id),
      );
    }

    for (const transiton of targetTransitionLines) {
      deltringLines.push(
        await this.workflowTransitionService.deleteTranstion(transiton.id),
      );
    }

    await Promise.all(deltringLines);
    await this.workflowStateService.deleteWorkflowState(workflowStateId);

    return null;
  }

  async createNodeConnection({
    sourceId,
    targetId,
    workflowId,
    otherWise,
  }: {
    sourceId: string;
    targetId: string;
    workflowId: string;
    otherWise: boolean;
  }): Promise<null> {
    await this.workflowTransitionService.createTranstion({
      nextStateId: targetId,
      workflowStateId: sourceId,
      workflowId,
      otherWise,
    });
    return null;
  }

  async updateFlowFilter(
    workflowId: string,
    flowFilter?: BaseConditionalFilter[][],
  ): Promise<null> {
    await this.workflowRepo.update(workflowId, {
      flowFilter,
    });
    return null;
  }

  async updateTriggerFilter(
    workflowId: string,
    triggerFilter?: BaseTriggerFilter[][],
  ): Promise<null> {
    await this.workflowRepo.update(workflowId, {
      triggerFilter,
    });
    return null;
  }

  async updateWorkflowDescription({
    descriptionHTML,
    descriptionLexical,
    workflowId,
  }: {
    workflowId: string;
    descriptionHTML: string;
    descriptionLexical: string;
  }): Promise<null> {
    await this.workflowRepo.update(workflowId, {
      descriptionHTML,
      descriptionLexical,
    });
    return null;
  }

  async convertWorkflowToPublic({
    workflowId,
  }: {
    workflowId: string;
  }): Promise<null> {
    await this.workflowRepo.update(workflowId, {
      public: true,
      workflowStatus: WorkflowStatus.INACTIVE,
    });
    return null;
  }

  async getPublicWorkflows(take: number, skip: number): Promise<Workflow[]> {
    const workflow = await this.workflowRepo.find({
      where: {
        public: true,
        workflowStatus: Not(WorkflowStatus.LIVE),
      },
      take,
      skip,
      order: {
        createdAt: 'desc',
      },
      relations: {
        store: true,
      },
    });
    return workflow;
  }

  async replicateWorkflow(
    replicaWorkflowId: string,
    storeId: string,
  ): Promise<Workflow | null> {
    try {
      const replicaWorkflow = await this.workflowRepo.findOne({
        where: {
          id: replicaWorkflowId,
        },
        relations: {
          workflowState: {
            workflowTransition: true,
          },
        },
      });

      if (!replicaWorkflow) return null;

      this.incrementReplicationCount(replicaWorkflowId);

      const { name, flowFilter, triggerFilter } = replicaWorkflow;

      const workflow = await this.workflowRepo.save({
        workflowStatus: WorkflowStatus.DRAFT,
        name,
        flowFilter,
        triggerFilter,
        storeId,
      });

      const stateMaps: Array<{
        newStateId: string;
        stateId: string;
        transtionId?: string;
        nextStateId?: string;
      }> = [];

      for (const rWorkflowState of replicaWorkflow.workflowState) {
        const {
          name,
          value,
          workflowActivityType,
          description,
          workflowStateType,
          id: sId,
        } = rWorkflowState;

        let stateValue = value;

        if (workflowActivityType === WorkflowActivityType.LIST_TRIGGER) {
          stateValue = {
            listId: '',
          } as WorkflowStateListTriggerActivityValue;
        }

        const state = await this.workflowStateService.createReplicWorkflowState(
          {
            name:
              workflowActivityType === WorkflowActivityType.LIST_TRIGGER
                ? 'Select a list'
                : name,
            value: stateValue,
            workflowActivityType,
            description,
            workflowStateType,
            workflowId: workflow.id,
          },
        );

        for (const rWorkflowTranstion of rWorkflowState.workflowTransition) {
          const { nextStateId, id: tId } = rWorkflowTranstion;
          stateMaps.push({
            newStateId: state.id,
            nextStateId,
            stateId: sId,
            transtionId: tId,
          });
        }
        if (!stateMaps.some(({ stateId }) => stateId === sId)) {
          stateMaps.push({
            newStateId: state.id,
            stateId: sId,
          });
        }
      }

      replicaWorkflow.workflowState.forEach((rState) => {
        rState.workflowTransition.forEach(async (rTranstion) => {
          const { otherWise, id } = rTranstion;

          const currentTranstion = stateMaps.find(
            ({ transtionId }) => transtionId === id,
          );
          const mapState = stateMaps.find(
            ({ stateId }) => stateId === currentTranstion?.nextStateId,
          );

          await this.workflowTransitionService.createReplicaTransition({
            otherWise,
            workflowStateId: currentTranstion?.newStateId,
            nextStateId: mapState?.newStateId,
            workflowId: workflow.id,
          });
        });
      });

      return workflow;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getWorkflowCount(subdomain: string): Promise<number> {
    const count = await this.workflowRepo.count({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return count;
  }
}
