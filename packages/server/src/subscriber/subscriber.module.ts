import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { MetricModule } from '../metric/metirc.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { SubscriberController } from './subscriber.controller';
import { Subscriber, SubscriberAddress } from './subscriber.entity';
import { SubscriberListener } from './subscriber.listner';
import { SubscriberResolver } from './subscriber.resolver';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriber, SubscriberAddress]),
    EventModule,
    SubscriberListModule,
    MetricModule,
  ],
  providers: [SubscriberService, SubscriberResolver, SubscriberListener],
  controllers: [SubscriberController],
  exports: [SubscriberService],
})
export class SubscriberModule {}
