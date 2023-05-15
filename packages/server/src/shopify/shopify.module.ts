import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { SseModule } from '../sse/sse.module';
import { Shopify } from './shopify.entity';
import { ShopifyListener } from './shopify.listner';
import { ShopifyResolver } from './shopify.resolver';
import { ShopifyService } from './shopify.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shopify]), EventModule, SseModule],
  providers: [ShopifyService, ShopifyResolver, ShopifyListener],
  exports: [ShopifyService],
})
export class ShopifyModule {}
