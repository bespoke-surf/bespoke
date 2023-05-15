import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { QuestType } from './enum/questType.enum';
import { QuestService } from './quest.service';
import { Quest } from './quests.entity';

@Resolver()
export class QuestResolver {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(AuthGuard)
  @Query(() => Quest, {
    nullable: true,
    description: 'get mandatory quest',
  })
  getMandatoryQuest(
    @Args('questType', { type: () => QuestType })
    questType: QuestType,
  ): Promise<Quest | null> {
    return this.questService.getMandatoryQuests(questType);
  }
}
