import { Injectable, MessageEvent } from '@nestjs/common';
import { filter, map, Observable, Subject } from 'rxjs';
import { EventType } from '../event/enum/eventType.enum';

export interface IAddEvent {
  data: { message: string; state: string };
  id?: string;
  type?: string;
  retry?: number;
}

@Injectable()
export class SseService {
  private readonly events;

  constructor() {
    this.events = new Subject<MessageEvent>();
  }

  addEvent(event: IAddEvent) {
    return this.events.next(event);
  }

  sendEventShopifyProduct(subdomain: string): Observable<MessageEvent> {
    return this.events.pipe(
      filter(
        (event: MessageEvent) =>
          event.id === subdomain &&
          event.type === EventType.SHOPIFY_PRODUCT_SYNC,
      ),
      map((event) => ({
        data: event,
      })),
    );
  }

  sendEventShopifyCustomer(subdomain: string): Observable<MessageEvent> {
    return this.events.pipe(
      filter(
        (event: MessageEvent) =>
          event.id === subdomain &&
          event.type === EventType.SHOPIFY_CUSTOMER_SYNC,
      ),
      map((event) => ({
        data: event,
      })),
    );
  }

  sendEventShopifyProductProgress(subdomain: string): Observable<MessageEvent> {
    return this.events.pipe(
      filter(
        (event: MessageEvent) =>
          event.id === subdomain &&
          event.type === EventType.SHOPIFY_PRODUCT_SYNC_PROGRESS,
      ),
      map((event) => ({
        data: event,
      })),
    );
  }
  sendEventShopifyCustomerProgress(
    subdomain: string,
  ): Observable<MessageEvent> {
    return this.events.pipe(
      filter(
        (event: MessageEvent) =>
          event.id === subdomain &&
          event.type === EventType.SHOPIFY_CUSTOMER_SYNC_PROGRESS,
      ),
      map((event) => ({
        data: event,
      })),
    );
  }
}
