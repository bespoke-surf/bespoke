import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { Item } from './items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemResolver, ItemService],
  exports: [ItemService],
})
export class ItemModule {}
