import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { QuestType } from '../quest/enum/questType.enum';
import { DAYJS_TIMESTAMPZ_FORMAT } from '../utils/constants';
import { getLastQuarter, getThisQuarter } from '../utils/quarterDates';
import { StoreChallenge } from './storeChallenge.entity';

@Injectable()
export class StoreChallengeService {
  constructor(
    @InjectRepository(StoreChallenge)
    private readonly storeChallengeRepo: Repository<StoreChallenge>,
  ) {}

  async getStoreChallengeOfQuestType({
    challengeId,
    questType,
    storeId,
  }: {
    storeId: string;
    challengeId: string;
    questType: QuestType;
  }): Promise<StoreChallenge | null> {
    let date;
    if (questType === QuestType.DAILY) {
      date = dayjs().startOf('day').format(DAYJS_TIMESTAMPZ_FORMAT);
    }
    if (questType === QuestType.WEEKLY) {
      date = dayjs().startOf('week').format(DAYJS_TIMESTAMPZ_FORMAT);
    }
    if (questType === QuestType.MILESTONE) {
      date = getLastQuarter().quarterEnd;
    }
    const storeChallenge = await this.storeChallengeRepo
      .createQueryBuilder('storeChallenge')
      .where('storeChallenge.createdAt >= :date', { date })
      .andWhere('storeChallenge.challengeId =:challengeId', { challengeId })
      .andWhere('storeChallenge.storeId =:storeId', { storeId })
      .getOne();

    return storeChallenge;
  }

  async getCurrentStoreChallengesByQuestType({
    questType,
    storeId,
  }: {
    storeId: string;
    questType: QuestType;
  }): Promise<StoreChallenge[]> {
    let startDate;
    let endDate;
    if (questType === QuestType.DAILY) {
      startDate = dayjs().startOf('day').format(DAYJS_TIMESTAMPZ_FORMAT);
      endDate = dayjs().endOf('day').format(DAYJS_TIMESTAMPZ_FORMAT);
    }
    if (questType === QuestType.WEEKLY) {
      startDate = dayjs().startOf('week').format(DAYJS_TIMESTAMPZ_FORMAT);
      endDate = dayjs().endOf('week').format(DAYJS_TIMESTAMPZ_FORMAT);
    }
    if (questType === QuestType.MILESTONE) {
      startDate = getThisQuarter().quarterStart;
      endDate = getThisQuarter().quarterEnd;
    }
    const storeChallenge = await this.storeChallengeRepo
      .createQueryBuilder('storeChallenge')
      .where('storeChallenge.createdAt >= :startDate', { startDate })
      .andWhere('storeChallenge.createdAt <= :endDate', { endDate })
      .andWhere('storeChallenge.storeId =:storeId', { storeId })
      .leftJoinAndSelect('storeChallenge.challenge', 'challenge')
      .leftJoin('challenge.quest', 'quest')
      .andWhere('quest.questType =:questType', { questType })
      .getMany();

    return storeChallenge;
  }

  async createStoreChallenge({
    challengeId,
    storeId,
  }: {
    challengeId: string;
    storeId: string;
  }) {
    const storeChallenge = await this.storeChallengeRepo.save({
      challengeId,
      storeId,
      completedCount: 0,
      completedStages: 0,
      allCompleted: false,
    });
    return storeChallenge;
  }

  async updateStoreChallengeCount({
    completedCount,
    storeChallengeId,
  }: {
    storeChallengeId: string;
    completedCount: number;
  }): Promise<StoreChallenge | null> {
    await this.storeChallengeRepo.update(storeChallengeId, {
      completedCount,
    });
    const storeChallenge = await this.storeChallengeRepo.findOne({
      where: {
        id: storeChallengeId,
      },
      relations: {
        store: {
          user: true,
        },
      },
    });
    return storeChallenge ?? null;
  }

  async updateStoreChallengeState({
    completedStages,
    storeChallengeId,
  }: {
    storeChallengeId: string;
    completedStages: number;
  }) {
    await this.storeChallengeRepo.update(storeChallengeId, {
      completedStages,
    });
  }

  async updateStoreChallengeAllCompleted({
    allCompleted,
    storeChallengeId,
  }: {
    storeChallengeId: string;
    allCompleted: boolean;
  }) {
    await this.storeChallengeRepo.update(storeChallengeId, {
      allCompleted,
    });
  }
}
