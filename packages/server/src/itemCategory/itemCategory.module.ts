import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '../item/item.module';
import { ItemCategory } from './itemCategory.entity';
import { ItemCategoryResolver } from './itemCategory.resolver';
import { ItemCategoryService } from './itemCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategory]), ItemModule],
  providers: [ItemCategoryService, ItemCategoryResolver],
})
export class ItemCategoryModule {}
