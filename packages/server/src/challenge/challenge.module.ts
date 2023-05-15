import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
