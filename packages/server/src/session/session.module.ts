import { Module } from '@nestjs/common';
import { ShopifySessionStorage } from './shopifySessionStorage';

@Module({
  providers: [ShopifySessionStorage],
  exports: [ShopifySessionStorage],
})
export class SessionModule {}
