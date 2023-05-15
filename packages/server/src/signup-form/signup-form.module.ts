import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { ItemModule } from '../item/item.module';
import { MetricModule } from '../metric/metirc.module';
import { StoreItemModule } from '../store-item/store-item.module';
import { SignupForm } from './signup-form.entity';
import { SignupFormResolver } from './signup-form.resolver';
import { SignupFormService } from './signup-form.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SignupForm]),
    EventModule,
    MetricModule,
    ItemModule,
    StoreItemModule,
  ],
  providers: [SignupFormService, SignupFormResolver],
  exports: [SignupFormService],
})
export class SignupFormModule {}
