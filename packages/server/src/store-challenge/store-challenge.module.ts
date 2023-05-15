import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreChallenge } from './storeChallenge.entity';
import { StoreChallengeResolver } from './storeChallenge.resolver';
import { StoreChallengeService } from './storeChallenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreChallenge])],
  providers: [StoreChallengeService, StoreChallengeResolver],
  exports: [StoreChallengeService],
})
export class StoreChallengeModule {}
