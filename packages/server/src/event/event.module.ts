import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SseModule } from '../sse/sse.module';
import { Event } from './event.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), SseModule],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
