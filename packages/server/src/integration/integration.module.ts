import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { ShopifyModule } from '../shopify/shopify.module';
import { Integration } from './integration.entity';
import { IntegrationResolver } from './integration.resolver';
import { IntegrationService } from './integration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    EventModule,
    ShopifyModule,
  ],
  providers: [IntegrationService, IntegrationResolver],
  exports: [IntegrationService],
})
export class IntegrationModule {}
