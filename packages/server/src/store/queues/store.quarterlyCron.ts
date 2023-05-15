import { Process, Processor } from '@nestjs/bull';
import { STORE_QUARTERLY_CRON_QUEUE } from '../../constants';

@Processor(STORE_QUARTERLY_CRON_QUEUE)
export class StoreQuarterlyCronProcessor {
  // constructor(private readonly challengeService: ChallengeService) {}

  @Process()
  async transcode() {
    //milestone quest is not more that 10, so it doenst need to be changed
    // const currentChallenge =
    //   await this.challengeService.getCurrentChallengesByQuestType(
    //     QuestType.MILESTONE,
    //   );
    // const newRands = await this.challengeService.getRandomChallengNotInList(
    //   QuestType.MILESTONE,
    //   currentChallenge,
    //   10,
    // );
    // for (const challenge of currentChallenge) {
    //   await this.challengeService.updateChallengHidden(challenge.id, true);
    // }
    // for (const challenge of newRands) {
    //   await this.challengeService.updateChallengHidden(challenge.id, false);
    // }
  }
}
