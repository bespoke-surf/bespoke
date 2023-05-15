import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPost } from './product-post.entity';
import { ProductPostResolver } from './product-post.resolver';
import { ProductPostService } from './product-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPost])],
  providers: [ProductPostService, ProductPostResolver],
})
export class ProductPostModule {}
