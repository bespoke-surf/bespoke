import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { Credit } from './credit.entity';
import { CreditResolver } from './credit.resolver';
import { CreditService } from './credit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Credit]), EventModule],
  providers: [CreditService, CreditResolver],
  exports: [CreditService],
})
export class CreditModule {}
