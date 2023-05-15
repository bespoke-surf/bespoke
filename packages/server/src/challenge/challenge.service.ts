import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricTypeEnum } from '../metric/enum/metric-type.enum';
import { QuestType } from '../quest/enum/questType.enum';
import { Challenge } from './challenge.entity';
import { CreateChallengeInput } from './dto/createTaskChallengeInput';
import { ChallengeTypeEnum } from './enum/challengeType.enum';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepo: Repository<Challenge>,
  ) {}

  async createChallenge(input: CreateChallengeInput): Promise<Challenge> {
    const challenge = await this.challengeRepo.save({
      ...input,
    });
    return challenge;
  }

  async getChallengeWithFields({
    completionCount,
    completionStages,
    name,
    challengeType,
    measuredMetric,
  }: {
    name: string;
    completionCount: number;
    completionStages: number;
    challengeType: ChallengeTypeEnum;
    measuredMetric?: MetricTypeEnum;
  }): Promise<Challenge | null> {
    const challenge = await this.challengeRepo.findOne({
      where: {
        name,
        completionCount,
        completionStages,
        challengeType,
        measuredMetric,
      },
    });
    return challenge;
  }

  async getChallengesByQuestType(questType: QuestType): Promise<Challenge[]> {
    const challenges = await this.challengeRepo.find({
      where: {
        challengeType: ChallengeTypeEnum.CHALLENGE,
        quest: {
          questType,
        },
      },
      relations: {
        quest: true,
      },
    });
    return challenges;
  }

  async getCurrentChallengesByQuestType(
    questType: QuestType,
  ): Promise<Challenge[]> {
    const currentChallenge = await this.challengeRepo.find({
      where: {
        isHidden: false,
        challengeType: ChallengeTypeEnum.CHALLENGE,
        quest: {
          questType,
        },
      },
      relations: {
        quest: true,
      },
    });
    return currentChallenge;
  }

  async updateChallengHidden(challengeId: string, isHidden: boolean) {
    return await this.challengeRepo.update(challengeId, {
      isHidden,
    });
  }

  async getRandomChallengNotInList(
    questType: QuestType,
    currentChallenge: Challenge[],
    limit: number,
  ) {
    const newRands = await this.challengeRepo
      .createQueryBuilder('challenge')
      .where('challenge.id NOT IN (:...ids)', {
        ids: currentChallenge.map(({ id }) => id),
      })
      .andWhere('challenge.challengeType = :challengeType', {
        challengeType: ChallengeTypeEnum.CHALLENGE,
      })
      .leftJoin('challenge.quest', 'quest')
      .andWhere('quest.questType = :questType', { questType })
      .orderBy('RANDOM()')
      .limit(limit)
      .getMany();
    return newRands;
  }
}
