import { Controller, MessageEvent, Param, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse(':subdomain/shopify-product')
  productSyncProgress(
    @Param('subdomain') subdomain: string,
  ): Observable<MessageEvent> | void {
    return this.sseService.sendEventShopifyProduct(subdomain);
  }

  @Sse(':subdomain/shopify-product-progress')
  shopifyProductProgress(
    @Param('subdomain') subdomain: string,
  ): Observable<MessageEvent> | void {
    return this.sseService.sendEventShopifyProductProgress(subdomain);
  }

  @Sse(':subdomain/shopify-customer')
  customerSyncProgress(
    @Param('subdomain') subdomain: string,
  ): Observable<MessageEvent> | void {
    return this.sseService.sendEventShopifyCustomer(subdomain);
  }

  @Sse(':subdomain/shopify-customer-progress')
  shopifyCustomerProgress(
    @Param('subdomain') subdomain: string,
  ): Observable<MessageEvent> | void {
    return this.sseService.sendEventShopifyCustomerProgress(subdomain);
  }
}
