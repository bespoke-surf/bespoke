import { CreateChallengeInput } from '../../challenge/dto/createTaskChallengeInput';
import { ChallengeTypeEnum } from '../../challenge/enum/challengeType.enum';
import { ChallengeMeasuredValueUnit } from '../../challenge/enum/criteriaType.enum';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';

// should be between 25 an 40

const defaults = {
  rewardXP: 6000,
  measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
  isHidden: true,
  challengeType: ChallengeTypeEnum.CHALLENGE,
};

export const milestoneChallenge: Omit<CreateChallengeInput, 'questId'>[] = [
  {
    ...defaults,
    name: 'Publish 2 newsletters',
    measuredMetric: MetricTypeEnum.POST_PUBLISHED,
    completionCount: 2,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.RATE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase newsletter view rate by 3%',
    measuredMetric: MetricTypeEnum.POST_VIEWED,
    completionCount: 4,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase email click through rate by 2%',
    measuredMetric: MetricTypeEnum.EMAIL_LINK_CLICKED,
    completionCount: 2,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },
  {
    ...defaults,
    name: 'Increase email open rate by 3%',
    measuredMetric: MetricTypeEnum.EMAIL_OPENED,
    completionCount: 3,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },
  {
    ...defaults,
    name: 'Increase email delivery rate by 4%',
    measuredMetric: MetricTypeEnum.EMAIL_DELIVERED,
    completionCount: 4,
    completionStages: 23,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase revenue by 2%',
    measuredMetric: MetricTypeEnum.SHOPIFY_PLACED_ORDER_VALUE,
    completionCount: 2,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase fulfilled order value by 3%',
    measuredMetric: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER_VALUE,
    completionCount: 3,
    completionStages: 30,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase cart order rate by 2%',
    measuredMetric: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED,
    completionCount: 3,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase ordered product rate by 1%',
    measuredMetric: MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT_VALUE,
    completionCount: 3,
    completionStages: 20,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase email sent rate by 4%',
    measuredMetric: MetricTypeEnum.EMAIL_SENT,
    completionCount: 4,
    completionStages: 24,
    measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
    measuredValue: 1,
    isHidden: false,
  },
];
