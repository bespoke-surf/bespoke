import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeModule } from '../challenge/challenge.module';
import { QuestService } from './quest.service';
import { Quest } from './quests.entity';
import { QuestResolver } from './quest.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Quest]), ChallengeModule],
  providers: [QuestService, QuestResolver],
  exports: [QuestService],
})
export class QuestModule {}
