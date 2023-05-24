import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { HasStoreAccessWithWorkflow } from '../guard/hasStoreAccessWithWorkflow';
import { HasStoreAccessWithWorkflowState } from '../guard/hasStoreAccessWithWorkflowState';
import { CreateNewDelayNodeInput } from './dto/createNewDelayNodeInput';
import { UpdateFlowFilterInput } from './dto/updateFlowFilterInput';
import { UpdateTriggerFilterInput } from './dto/updateTriggerFilterInput';
import { WorkflowEdge } from './type/edgeType';
import { WorkflowNode } from './type/nodeType';
import { Workflow } from './workflow.entity';
import { WorkflowService } from './workflow.service';

@Resolver(() => Workflow)
export class WorkflowResolver {
  constructor(private readonly workflowService: WorkflowService) {}

  @ResolveField(() => [WorkflowNode], { nullable: true })
  async node(@Parent() parent: Workflow): Promise<WorkflowNode[] | null> {
    return this.workflowService.getNode(parent);
  }

  @ResolveField(() => [WorkflowEdge], { nullable: true })
  async edge(@Parent() parent: Workflow): Promise<WorkflowEdge[] | null> {
    return this.workflowService.getEdge(parent);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [Workflow], {
    nullable: true,
    description: 'get workflows',
  })
  getWorkflows(
    @Args('subdomain') subdomain: string,
  ): Promise<Workflow[] | null> {
    return this.workflowService.getWorkflows(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Query(() => Workflow, {
    nullable: true,
    description: 'get workflow',
  })
  getWorkflow(
    @Args('workflowId') workflowId: string,
  ): Promise<Workflow | null> {
    return this.workflowService.getWorkflow(workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'update workflow name',
  })
  updateWorkflowName(
    @Args('workflowId') workflowId: string,
    @Args('name') name: string,
  ): Promise<Workflow | null> {
    return this.workflowService.updateWorkflowName(workflowId, name);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'delete workflow name',
  })
  deleteWorkflow(
    @Args('workflowId') workflowId: string,
  ): Promise<Workflow | null> {
    return this.workflowService.deleteWorkflow(workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'update workflow data',
  })
  turnOnWorkflow(
    @Args('workflowId') workflowId: string,
  ): Promise<Workflow | null> {
    return this.workflowService.turnOnWorkflow(workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'update workflow data',
  })
  turnOffWorkflow(
    @Args('workflowId') workflowId: string,
  ): Promise<Workflow | null> {
    return this.workflowService.turnOffWorkflow(workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'create new delay node',
  })
  createNewDelayNode(
    @Args('input') input: CreateNewDelayNodeInput,
  ): Promise<Workflow | null> {
    return this.workflowService.createNewDelayNode(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'delete workflow node',
  })
  deleteWorkflowNode(@Args('workflowStateId') id: string): Promise<null> {
    return this.workflowService.deleteWorkflowNode(id);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'create new workflow connection',
  })
  createNodeConnection(
    @Args('workflowId') workflowId: string,
    @Args('sourceId') sourceId: string,
    @Args('targetId') targetId: string,
    @Args('otherWise') otherWise: boolean,
  ): Promise<null> {
    return this.workflowService.createNodeConnection({
      workflowId,
      sourceId,
      targetId,
      otherWise,
    });
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'update a flow filter',
  })
  updateFlowFilter(@Args('input') input: UpdateFlowFilterInput): Promise<null> {
    return this.workflowService.updateFlowFilter(
      input.workflowId,
      input.flowFilter,
    );
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'update trigger filter',
  })
  updateTriggerFilter(
    @Args('input') input: UpdateTriggerFilterInput,
  ): Promise<null> {
    return this.workflowService.updateTriggerFilter(
      input.workflowId,
      input.triggerFilter,
    );
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'add description to workflow',
  })
  updateWorkflowDescription(
    @Args('descriptionHTML') descriptionHTML: string,
    @Args('descriptionLexical') descriptionLexical: string,
    @Args('workflowId') workflowId: string,
  ): Promise<null> {
    return this.workflowService.updateWorkflowDescription({
      descriptionHTML,
      descriptionLexical,
      workflowId,
    });
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'convert workflow to public',
  })
  convertWorkflowToPublic(
    @Args('workflowId') workflowId: string,
  ): Promise<null> {
    return this.workflowService.convertWorkflowToPublic({
      workflowId,
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => [Workflow], {
    nullable: true,
    description: 'get public workflows',
  })
  getPublicWorkflows(
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
  ): Promise<Workflow[]> {
    return this.workflowService.getPublicWorkflows(take, skip);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Workflow, {
    nullable: true,
    description: 'replicate workflow ',
  })
  replicateWorkflow(
    @Args('storeId') storeId: string,
    @Args('replicaWorkflowId') replicaWorkflowId: string,
  ): Promise<Workflow | null> {
    return this.workflowService.replicateWorkflow(replicaWorkflowId, storeId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get workflow count',
  })
  getWorkflowCount(@Args('subdomain') subdomain: string): Promise<number> {
    return this.workflowService.getWorkflowCount(subdomain);
  }
}
