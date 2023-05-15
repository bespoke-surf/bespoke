import { Inject, UseGuards } from '@nestjs/common';
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
import { HasStoreAccessWithList } from '../guard/hasStoreAccessWithList';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { HasStoreAccessWithWorkflow } from '../guard/hasStoreAccessWithWorkflow';
import { HasStoreAccessWithWorkflowState } from '../guard/hasStoreAccessWithWorkflowState';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { List } from './list.entity';
import { ListService } from './list.service';

@Resolver(() => List)
export class ListResolver {
  constructor(
    @Inject(ListService)
    private readonly listService: ListService,
  ) {}

  @ResolveField()
  async members(@Parent() list: List): Promise<number> {
    return this.listService.getMembers(list);
  }

  @ResolveField()
  async addedToday(@Parent() list: List): Promise<number> {
    return this.listService.getSubscribersAddedToListCountByDayOrWeek(
      list,
      'day',
    );
  }

  @ResolveField()
  async addedThisWeek(@Parent() list: List): Promise<number> {
    return this.listService.getSubscribersAddedToListCountByDayOrWeek(
      list,
      'week',
    );
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [List], {
    description: 'get lists',
  })
  getLists(@Args('subdomain') subdomain: string): Promise<List[]> {
    return this.listService.getLists(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => List, {
    description: 'update post',
  })
  async createNewList(
    @Args('name') name: string,
    @Args('storeId') storeId: string,
  ): Promise<List | null> {
    return this.listService.createNewList(name, storeId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithList)
  @Mutation(() => List, {
    description: 'delete list with id',
  })
  async deleteList(@Args('listId') listId: string): Promise<List | null> {
    return this.listService.deleteList(listId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflow)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'create a list trigger',
  })
  createListTrigger(
    @Args('workflowId') workflowId: string,
    @Args('listId') listId: string,
  ): Promise<WorkflowState | null> {
    return this.listService.createListTrigger(listId, workflowId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithWorkflowState)
  @Mutation(() => WorkflowState, {
    nullable: true,
    description: 'update list trigger',
  })
  updateListTrigger(
    @Args('workflowStateId') workflowStateId: string,
    @Args('listId') listId: string,
  ): Promise<WorkflowState | null> {
    return this.listService.updateListTrigger(listId, workflowStateId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithList)
  @Mutation(() => List, {
    nullable: true,
    description: 'toggle list trigger',
  })
  toggleListStar(@Args('listId') listId: string): Promise<List | null> {
    return this.listService.toggleListStar(listId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [List], {
    nullable: true,
    description: 'get starred lists',
  })
  getStarredLists(
    @Args('subdomain') subdomain: string,
  ): Promise<List[] | null> {
    return this.listService.getStarredLists(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get list count',
  })
  getListCount(@Args('subdomain') subdomain: string): Promise<number> {
    return this.listService.getListCount(subdomain);
  }
}
