import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriberListService } from '../subscriber-list/subscriber-list.service';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { WorkflowStateService } from '../workflow-state/workflow-state.service';
import { List } from './list.entity';
import { LIST_DELETE_EVENT } from './list.listner';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
    private readonly subscriberListService: SubscriberListService,
    private eventEmitter: EventEmitter2,
    private workflowStateService: WorkflowStateService,
  ) {}

  async emitEvent(eventName: string, listId: string) {
    const list = await this.listRepo.findOne({
      where: {
        id: listId,
      },
      relations: {
        store: {
          user: true,
        },
      },
    });
    this.eventEmitter.emit(eventName, list);
  }

  async getList(listId: string): Promise<List | null> {
    const lists = await this.listRepo.findOne({
      where: {
        id: listId,
      },
    });
    return lists;
  }

  async getLists(subdomain: string): Promise<List[]> {
    const lists = await this.listRepo.find({
      where: {
        store: {
          subdomain,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return lists;
  }

  async getMembers(list: List): Promise<number> {
    const count = await this.subscriberListService.getSubscribersInListCount(
      list.id,
    );
    return count;
  }

  async getSubscribersAddedToListCountByDayOrWeek(
    list: List,
    mode: 'day' | 'week',
  ): Promise<number> {
    const count =
      await this.subscriberListService.getSubscribersAddedToListByDayOrWeek(
        list.id,
        mode,
      );
    return count;
  }

  async createNewList(name: string, storeId: string): Promise<List | null> {
    const list = await this.listRepo.save({
      name,
      storeId,
    });

    const getAllLists = await this.listRepo.find({
      where: {
        storeId,
      },
    });

    if (getAllLists.length === 1 && getAllLists[0]) {
      await this.listRepo.update(getAllLists[0].id, {
        isDefaultStoreList: true,
      });
    }

    return list ?? null;
  }

  async getStoreDefaultList(storeId: string): Promise<List | null> {
    const list = await this.listRepo.findOne({
      where: {
        storeId,
        isDefaultStoreList: true,
      },
    });
    return list ?? null;
  }

  async updateisDefaultList(listId: string, storeId: string): Promise<null> {
    const list = await this.listRepo.findOne({
      where: {
        isDefaultStoreList: true,
        storeId,
      },
    });
    if (list) {
      await this.listRepo.update(list?.id, {
        isDefaultStoreList: false,
      });
    }
    await this.listRepo.update(listId, {
      isDefaultStoreList: true,
    });
    return null;
  }

  async deleteList(listId: string): Promise<null> {
    await this.emitEvent(LIST_DELETE_EVENT, listId);
    await this.listRepo.delete(listId);
    return null;
  }

  async getShopifyUnsubscribedList(storeId: string): Promise<List | null> {
    let list;
    list = await this.listRepo.findOne({
      where: {
        storeId,
        name: 'Shopify Unsubscribed',
      },
    });
    if (!list) {
      list = await this.createNewList('Shopify Unsubscribed', storeId);
    }
    return list ?? null;
  }

  async createListTrigger(
    listId: string,
    workflowId: string,
  ): Promise<WorkflowState | null> {
    const list = await this.getList(listId);

    if (list) {
      const state = await this.workflowStateService.createListWorkflowState(
        list,
        workflowId,
      );

      return state;
    }
    return null;
  }

  async updateListTrigger(
    listId: string,
    workflowStateId: string,
  ): Promise<WorkflowState | null> {
    const list = await this.getList(listId);

    if (list) {
      await this.workflowStateService.updateListWorkflowState(
        list,
        workflowStateId,
      );
    }
    return null;
  }

  async toggleListStar(listId: string): Promise<List | null> {
    const list = await this.listRepo.findOne({
      where: {
        id: listId,
      },
    });
    if (!list) return null;
    await this.listRepo.update(listId, {
      starred: !list?.starred,
    });
    return null;
  }

  async getStarredLists(subdomain: string): Promise<List[] | null> {
    const lists = await this.listRepo.find({
      where: {
        starred: true,
        store: {
          subdomain,
        },
      },
    });
    return lists;
  }

  async getListCount(subdomain: string): Promise<number> {
    const count = await this.listRepo.count({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return count;
  }
}
