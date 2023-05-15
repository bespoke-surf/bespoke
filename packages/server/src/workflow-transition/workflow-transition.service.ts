import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowTransition } from './workflow-transition.entity';

@Injectable()
export class WorkflowTransitionService {
  constructor(
    @InjectRepository(WorkflowTransition)
    private readonly workflowTransitionRepo: Repository<WorkflowTransition>,
  ) {}

  async getWorkflowTransitionsOfNextState(
    nextStateId: string,
  ): Promise<WorkflowTransition[]> {
    const transtions = await this.workflowTransitionRepo.find({
      where: {
        nextStateId,
      },
    });
    return transtions;
  }

  async getWorkflowTransitionsOfStates(
    workflowStateId: string,
  ): Promise<WorkflowTransition[]> {
    const transtions = await this.workflowTransitionRepo.find({
      where: {
        workflowStateId,
      },
    });
    return transtions;
  }

  async deleteTranstion(workflowTransitionId: string): Promise<boolean> {
    const deleted = await this.workflowTransitionRepo.delete(
      workflowTransitionId,
    );

    if (deleted?.affected) {
      return true;
    }
    return false;
  }

  async getWorflowTransitons(
    workflowId: string,
  ): Promise<WorkflowTransition[]> {
    const transtions = await this.workflowTransitionRepo.find({
      where: {
        workflowId,
      },
    });
    return transtions;
  }

  async createTranstion({
    workflowStateId,
    nextStateId,
    workflowId,
    otherWise = false,
  }: {
    workflowStateId: string;
    nextStateId: string;
    workflowId: string;
    otherWise?: boolean;
  }): Promise<WorkflowTransition | null> {
    const transition = await this.workflowTransitionRepo.save({
      workflowStateId,
      nextStateId,
      workflowId,
      otherWise,
    });
    return transition ?? null;
  }

  async createReplicaTransition(
    input: Partial<WorkflowTransition>,
  ): Promise<WorkflowTransition> {
    return await this.workflowTransitionRepo.save({
      ...input,
    });
  }
  async updateReplicaTranstionNextState({
    nextStateId,
    transtionId,
  }: {
    transtionId: string;
    nextStateId: string;
  }): Promise<null> {
    await this.workflowTransitionRepo.update(transtionId, {
      nextStateId,
    });
    return null;
  }
}
