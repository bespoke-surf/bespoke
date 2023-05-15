import { Process, Processor } from '@nestjs/bull';
import { ChallengeService } from '../../challenge/challenge.service';
import { STORE_DIALY_CRON_QUEUE } from '../../constants';
import { QuestType } from '../../quest/enum/questType.enum';

@Processor(STORE_DIALY_CRON_QUEUE)
export class StoreDailyCronProcessor {
  constructor(private readonly challengeService: ChallengeService) {}

  @Process()
  async transcode() {
    const currentChallenge =
      await this.challengeService.getCurrentChallengesByQuestType(
        QuestType.DAILY,
      );

    const newRands = await this.challengeService.getRandomChallengNotInList(
      QuestType.DAILY,
      currentChallenge,
      3,
    );
    for (const challenge of currentChallenge) {
      await this.challengeService.updateChallengHidden(challenge.id, true);
    }
    for (const challenge of newRands) {
      await this.challengeService.updateChallengHidden(challenge.id, false);
    }
  }
}
