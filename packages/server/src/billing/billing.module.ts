import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';
import { BillingResolver } from './billing.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  providers: [BillingService, BillingResolver],
  exports: [BillingService],
})
export class BillingModule {}
