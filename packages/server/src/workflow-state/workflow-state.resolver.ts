import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithWorkflow } from '../guard/hasStoreAccessWithWorkflow';
import { HasStoreAccessWithWorkflowState } from '../guard/hasStoreAccessWithWorkflowState';
import { CreateConditionalSplitNodeInput } from './dto/createConditionalStateInput';
import { CreateSendEmailNodeInput } from './dto/createSendEmailState';
import { CreateTriggerSplitNodeInput } from './dto/createTriggersplitNodeInput';
import { UpdateConditionalSplitStateInput } from './dto/updateConditionalStateInput';
import { UpdateDelayStateInput } from './dto/updateDelayState';
import { UpdateSendEmailStateInput } from './dto/updateSendEmailState';
import { UpdateTriggerSplitStateInput } from './dto/updateTriggerSplitStateInput';
import { WorkflowState } from './workflow-state.entity';
import { WorkflowStateService } from './workflow-state.service';

@Resolver(() => WorkflowState)
export class WorkflowStateResolver {
  constructor(private readonly workflowStateService: WorkflowStateService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update a delay state',
  })
  updateDelayState(
    @Args('input') input: UpdateDelayStateInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.updateDelayState(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update conditional split node',
  })
  createConditionalSplitNode(
    @Args('input') input: CreateConditionalSplitNodeInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.createConditionalSplitNode(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update trigger split node',
  })
  createTriggerSplitNode(
    @Args('input') input: CreateTriggerSplitNodeInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.createTriggerSplitNode(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'create send email node',
  })
  createSendEmailNode(
    @Args('input') input: CreateSendEmailNodeInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.createSendEmailNode(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update a conditional split state',
  })
  updateConditionalSplitState(
    @Args('input') input: UpdateConditionalSplitStateInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.updateConditionalSplitState(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update a conditional split state',
  })
  updateSendEmailState(
    @Args('input') input: UpdateSendEmailStateInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.updateSendEmailState(input);
  }
  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update a trigger split state',
  })
  updateTriggerSplitState(
    @Args('input') input: UpdateTriggerSplitStateInput,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.updateTriggerSplitState(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'delete workflow transtion ',
  })
  deleteWorkflowTransition(
    @Args('workflowId') _: string,
    @Args('workflowTransitionId') id: string,
  ): Promise<WorkflowState | null> {
    return this.workflowStateService.deleteWorkflowTransition(id);
  }
}
