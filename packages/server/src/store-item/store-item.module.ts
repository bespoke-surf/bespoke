import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { ItemModule } from '../item/item.module';
import { StoreItem } from './store-item.entity';
import { StoreItemResolver } from './store-item.resolver';
import { StoreItemService } from './store-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreItem]), ItemModule, EventModule],
  providers: [StoreItemService, StoreItemResolver],
  exports: [StoreItemService],
})
export class StoreItemModule {}
