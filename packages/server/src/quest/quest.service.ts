import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeService } from '../challenge/challenge.service';
import { CreateChallengeInput } from '../challenge/dto/createTaskChallengeInput';
import { ChallengeTypeEnum } from '../challenge/enum/challengeType.enum';
import { dailyChallenges } from './data/dailyChallenges';
import { milestoneChallenge } from './data/milestoneChallenges';
import { weeklyChallenge } from './data/weeklyChallenges';

import { CreateQuestInput } from './dto/questInput';
import { QuestType } from './enum/questType.enum';
import { Quest } from './quests.entity';

@Injectable()
export class QuestService implements OnModuleInit {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepo: Repository<Quest>,
    private readonly challengeService: ChallengeService,
  ) {}

  onModuleInit() {
    // this.defaultSeed();
  }

  async creatQuest(input: CreateQuestInput): Promise<Quest> {
    const quest = await this.questRepo.save({
      ...input,
    });
    return quest;
  }

  async getQuestWithType(questType: QuestType): Promise<Quest | null> {
    const quest = await this.questRepo.findOne({
      where: {
        questType,
      },
    });
    return quest;
  }

  async seedQuest({
    questId,
    taskChallengeInput,
  }: {
    questId: string;
    taskChallengeInput?: Omit<CreateChallengeInput, 'questId'>;
  }) {
    if (taskChallengeInput?.challengeType === ChallengeTypeEnum.CHALLENGE) {
      await this.challengeService.createChallenge({
        ...taskChallengeInput,
        questId,
      });
    }
  }

  async getQuest(questType: QuestType): Promise<Quest> {
    let quest: Quest | null = null;
    quest = await this.questRepo.findOne({
      where: {
        questType,
      },
    });
    if (!quest) {
      quest = await this.creatQuest({
        name:
          questType === QuestType.DAILY
            ? 'DAILY'
            : questType === QuestType.WEEKLY
            ? 'THIS WEEK'
            : 'MILESTONE',
        questType,
      });
    }
    return quest;
  }

  async defaultSeed() {
    const dialyQuest = await this.getQuest(QuestType.DAILY);
    const weeklyQuest = await this.getQuest(QuestType.WEEKLY);
    const milestoneQuest = await this.getQuest(QuestType.MILESTONE);

    for (const daily of [...dailyChallenges]) {
      const exist = await this.challengeService.getChallengeWithFields({
        ...daily,
      });

      if (exist) continue;

      this.seedQuest({
        questId: dialyQuest.id,
        taskChallengeInput: daily as Omit<CreateChallengeInput, 'questId'>,
      });
    }

    for (const weekly of [...weeklyChallenge]) {
      const exist = await this.challengeService.getChallengeWithFields({
        ...weekly,
      });
      if (exist) continue;
      this.seedQuest({
        questId: weeklyQuest.id,
        taskChallengeInput: weekly as Omit<CreateChallengeInput, 'questId'>,
      });
    }

    for (const milestone of [...milestoneChallenge]) {
      const exist = await this.challengeService.getChallengeWithFields({
        ...milestone,
      });
      if (exist) continue;
      this.seedQuest({
        questId: milestoneQuest.id,
        taskChallengeInput: milestone as Omit<CreateChallengeInput, 'questId'>,
      });
    }
  }

  async getMandatoryQuests(questType: QuestType): Promise<Quest | null> {
    console.log(questType);
    const quest = await this.questRepo.findOne({
      where: {
        questType,
        challenges: {
          isHidden: false,
        },
      },
      relations: {
        challenges: true,
      },
    });
    console.log({ quest });
    return quest;
  }
}
