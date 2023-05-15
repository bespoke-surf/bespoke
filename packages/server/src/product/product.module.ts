import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { S3Module } from '../s3/s3.module';
import { Product } from './product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), S3Module, EventModule],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
