import { Process, Processor } from '@nestjs/bull';
import { ChallengeService } from '../../challenge/challenge.service';
import { STORE_WEEKLY_CRON_QUEUE } from '../../constants';
import { QuestType } from '../../quest/enum/questType.enum';

@Processor(STORE_WEEKLY_CRON_QUEUE)
export class StoreWeeklyCronProcesson {
  constructor(private readonly challengeService: ChallengeService) {}

  @Process()
  async transcode() {
    const currentChallenge =
      await this.challengeService.getCurrentChallengesByQuestType(
        QuestType.WEEKLY,
      );

    const newRands = await this.challengeService.getRandomChallengNotInList(
      QuestType.WEEKLY,
      currentChallenge,
      5,
    );

    for (const challenge of currentChallenge) {
      await this.challengeService.updateChallengHidden(challenge.id, true);
    }
    for (const challenge of newRands) {
      await this.challengeService.updateChallengHidden(challenge.id, false);
    }
  }
}
