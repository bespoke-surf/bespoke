import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { List } from '../list/list.entity';
import { LIST_DELETE_EVENT } from '../list/list.listner';
import { ShopifyService } from './shopify.service';

export const SHOPIFY_PRODUCT_SYNC_EVENT = 'shopify_product_sync_event';
export const SHOPIFY_CUSTOMER_SYNC_EVENT = 'shopify_customer)sync_event';

@Injectable()
export class ShopifyListener {
  constructor(
    // private readonly eventService: EventService,
    private readonly shopifyService: ShopifyService,
  ) {}

  // @OnEvent(SHOPIFY_PRODUCT_SYNC_EVENT)
  // handleUserCreatedEvent(event: Shopify) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.SHOPIFY_PRODUCT_SYNC,
  //     message: `Shopify product sync`,
  //     userId: event.integration.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }

  // @OnEvent(SHOPIFY_CUSTOMER_SYNC_EVENT)
  // handleUserDeleteEvent(event: Shopify) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.SHOPIFY_CUSTOMER_SYNC,
  //     message: `Shopify customer sync`,
  //     userId: event.integration.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }

  @OnEvent(LIST_DELETE_EVENT)
  handleSubscriberRemoved(event: List) {
    this.shopifyService.removeCollectEmailSubscribersForListenr(event.id);
  }
}
