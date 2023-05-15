import { Process, Processor } from '@nestjs/bull';
import { GraphqlQueryError } from '@shopify/shopify-api';
import { Job } from 'bull';
import { ChallengeService } from '../../challenge/challenge.service';
import { ChallengeMeasuredValueUnit } from '../../challenge/enum/criteriaType.enum';
import { STORE_QUEST_QUEUE } from '../../constants';
import { EventAccessRestriction } from '../../event/enum/eventConfidentiality';
import { EventState } from '../../event/enum/eventState.enum';
import { EventType } from '../../event/enum/eventType.enum';
import { EventService } from '../../event/event.service';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';
import { MetricService } from '../../metric/metirc.service';
import { QuestType } from '../../quest/enum/questType.enum';
import { StoreChallengeService } from '../../store-challenge/storeChallenge.service';
import { StartOfEndOfUnitType } from '../../utils/quarterDates';

export type StoreXPQuestQueueData = {
  metricId: string;
};

@Processor(STORE_QUEST_QUEUE)
export class StoreQuestProcessor {
  constructor(
    private metricService: MetricService,
    private challengeService: ChallengeService,
    private storeChallengeService: StoreChallengeService,
    private eventService: EventService,
  ) {}

  @Process()
  async transcode(job: Job<StoreXPQuestQueueData>) {
    try {
      const metric = await this.metricService.getMetricById(job.data.metricId);
      if (!metric) return;

      // get daily wekkly and milestone challenges
      // see see if measure value is triggered
      // add to store challenge or increment store challenge value;

      const dailyChallenges =
        await this.challengeService.getCurrentChallengesByQuestType(
          QuestType.DAILY,
        );
      const weeklyChallenges =
        await this.challengeService.getCurrentChallengesByQuestType(
          QuestType.WEEKLY,
        );
      const milestoneChallenges =
        await this.challengeService.getCurrentChallengesByQuestType(
          QuestType.MILESTONE,
        );

      const allChallenges = [
        ...dailyChallenges,
        ...weeklyChallenges,
        ...milestoneChallenges,
      ];

      for (const challenge of allChallenges) {
        if (challenge.measuredMetric !== metric.metricType) {
          continue;
        }

        let addToState = false;

        const lasValueTag: StartOfEndOfUnitType =
          challenge.quest.questType === QuestType.DAILY
            ? 'yesterday'
            : challenge.quest.questType === QuestType.WEEKLY
            ? 'lastWeek'
            : 'lastQuarter';

        const thisValueTag: StartOfEndOfUnitType =
          challenge.quest.questType === QuestType.DAILY
            ? 'today'
            : challenge.quest.questType === QuestType.WEEKLY
            ? 'thisWeek'
            : 'thisQuarter';

        // measured value for rates is always 1
        if (challenge.measuredUnit === ChallengeMeasuredValueUnit.RATE) {
          addToState = true;
        }
        // percentage rates from total all values.
        if (challenge.measuredUnit === ChallengeMeasuredValueUnit.PERCENTAGE) {
          let lastValue;
          let thisValue;
          if (
            challenge.measuredMetric ===
              MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED_VALUE ||
            challenge.measuredMetric ===
              MetricTypeEnum.SHOPIFY_FULFILLED_ORDER_VALUE ||
            challenge.measuredMetric ===
              MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT_VALUE ||
            challenge.measuredMetric ===
              MetricTypeEnum.SHOPIFY_PLACED_ORDER_VALUE
          ) {
            lastValue = await this.metricService.getMetricValuByUnitDays(
              lasValueTag,
              challenge.measuredMetric,
            );
            thisValue = await this.metricService.getMetricValuByUnitDays(
              thisValueTag,
              challenge.measuredMetric,
            );
          } else {
            lastValue = await this.metricService.getMetricCountByUnitDays(
              lasValueTag,
              challenge.measuredMetric,
            );
            thisValue = await this.metricService.getMetricCountByUnitDays(
              thisValueTag,
              challenge.measuredMetric,
            );
          }
          const newValue = lastValue + thisValue;
          const changeInPercent = ((newValue - lastValue) / lastValue) * 100;
          if (challenge.measuredValue === undefined) return;

          if (lastValue === 0 && newValue >= challenge?.measuredValue) {
            addToState = true;
          } else if (changeInPercent >= challenge?.measuredValue) {
            addToState = true;
          }
        }

        if (!addToState) continue;
        await this.incrementCountAndState({
          challengeId: challenge.id,
          completionCount: challenge.completionCount,
          completionStages: challenge.completionStages,
          questType: challenge.quest.questType,
          storeId: metric.storeId,
          name: challenge.name,
        });
      }

      return Promise.resolve();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error instanceof GraphqlQueryError) {
        return Promise.reject(new Error(`${error.message}`));
      } else {
        return Promise.reject(new Error(JSON.stringify(error)));
      }
    }
  }

  async incrementCountAndState({
    challengeId,
    completionStages,
    completionCount,
    questType,
    storeId,
    name,
  }: {
    storeId: string;
    challengeId: string;
    questType: QuestType;
    completionCount: number;
    completionStages: number;
    name: string;
  }): Promise<boolean> {
    let storeChallenge =
      await this.storeChallengeService.getStoreChallengeOfQuestType({
        challengeId,
        questType,
        storeId,
      });

    if (storeChallenge?.allCompleted === true) {
      return false;
    }
    if (!storeChallenge) {
      storeChallenge = await this.storeChallengeService.createStoreChallenge({
        challengeId,
        storeId,
      });
    }

    const count = completionCount;
    const stages = completionStages;
    const ccount = storeChallenge.completedCount;
    const cStages = storeChallenge.completedStages;
    if (count > ccount) {
      await this.storeChallengeService.updateStoreChallengeCount({
        completedCount: ccount + 1,
        storeChallengeId: storeChallenge.id,
      });
    }
    if (count === ccount + 1) {
      await this.storeChallengeService.updateStoreChallengeState({
        completedStages: cStages + 1,
        storeChallengeId: storeChallenge.id,
      });
      if (count === ccount + 1 && stages === cStages + 1) {
        await this.storeChallengeService.updateStoreChallengeAllCompleted({
          allCompleted: true,
          storeChallengeId: storeChallenge.id,
        });

        return true;
      } else {
        const storeChalleng =
          await this.storeChallengeService.updateStoreChallengeCount({
            completedCount: 0,
            storeChallengeId: storeChallenge.id,
          });
        if (storeChalleng?.store.user.id) {
          this.eventService.createEvent({
            message: `Stage ${
              cStages + 1
            } of ${completionStages} - ${name} completed.`,
            eventProducerId: challengeId,
            eventAccessRestriction: EventAccessRestriction.HIGH,
            eventState: EventState.COMPLETED,
            eventType: EventType.STORE_CHALLENGE,
            userId: storeChalleng.store.user.id,
            showAsNotification: true,
            link:
              questType === QuestType.DAILY
                ? '/dashboard/challenges/daily'
                : questType === QuestType.WEEKLY
                ? '/dashboard/challenges'
                : '/dashboard/challenges/milestone',
          });
        }
        //TODO: should decide to give reward for each stage wins?
      }
    }
    return false;
  }
}

/*


*/
