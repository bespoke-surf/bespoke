import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../casl/casl.module';
import { EventModule } from '../event/event.module';
import { MetricModule } from '../metric/metirc.module';
import { SubscriberListModule } from '../subscriber-list/subscriber-list.module';
import { SubscriberApiController } from './subscriber.api.controller';
import { SubscriberApiService } from './subscriber.api.service';
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
    CaslModule,
  ],
  providers: [
    SubscriberService,
    SubscriberResolver,
    SubscriberListener,
    SubscriberApiService,
  ],
  controllers: [SubscriberApiController, SubscriberController],
  exports: [SubscriberService],
})
export class SubscriberModule {}
