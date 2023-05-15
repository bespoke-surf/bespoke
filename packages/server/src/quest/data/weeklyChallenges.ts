import { CreateChallengeInput } from '../../challenge/dto/createTaskChallengeInput';
import { ChallengeTypeEnum } from '../../challenge/enum/challengeType.enum';
import { ChallengeMeasuredValueUnit } from '../../challenge/enum/criteriaType.enum';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';

// should be between 3 an 5 % growth

// 5% default
const defaults = {
  rewardXP: 16000,
  completionCount: 1,
  completionStages: 1,
  measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
  measuredValue: 5,
  isHidden: true,
  challengeType: ChallengeTypeEnum.CHALLENGE,
};
export const weeklyChallenge: Omit<CreateChallengeInput, 'questId'>[] = [
  {
    ...defaults,
    name: 'Increase email open rate by 2%',
    measuredMetric: MetricTypeEnum.EMAIL_OPENED,
    completionCount: 2,
    completionStages: 2,
    measuredValue: 2,
    isHidden: false,
  },
  {
    ...defaults,
    name: 'Increase email click through rate by 1%',
    measuredMetric: MetricTypeEnum.EMAIL_LINK_CLICKED,
    measuredValue: 1,
    completionStages: 4,
    isHidden: false,
  },
  {
    ...defaults,
    name: 'Increase email delivery rate by 3%',
    measuredMetric: MetricTypeEnum.EMAIL_DELIVERED,
    completionStages: 2,
    completionCount: 1,
    measuredValue: 3,
    isHidden: false,
  },

  {
    ...defaults,
    name: 'Increase email sent rate by 2%',
    measuredMetric: MetricTypeEnum.EMAIL_SENT,
    measuredValue: 2,
    completionCount: 1,
    completionStages: 3,
    isHidden: false,
  },

  // {
  //   ...defaults,
  //   name: 'Increase signup submission rate by 2%',
  //   measuredMetric: MetricTypeEnum.FORM_SUBMITTED,
  //   isHidden: false,
  //   completionStages: 3,
  //   completionCount: 2,
  //   measuredValue: 1,
  // },

  // {
  //   ...defaults,
  //   name: 'Increase signup form viewed rate by 5%',
  //   measuredMetric: MetricTypeEnum.FORM_VIEWED,
  // },

  {
    ...defaults,
    name: 'Increase newsletter view rate by 3%',
    measuredMetric: MetricTypeEnum.POST_VIEWED,
    measuredValue: 1,
    completionStages: 3,
    completionCount: 3,
  },
  {
    ...defaults,
    name: 'Increase cart order value by 3%',
    measuredMetric: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED_VALUE,
    measuredValue: 3,
    completionStages: 2,
    completionCount: 1,
  },

  {
    ...defaults,
    name: 'Increase fulfilled order value by 3%',
    measuredMetric: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER_VALUE,
    measuredValue: 1,
    completionStages: 2,
    completionCount: 3,
  },

  {
    ...defaults,
    name: 'Increase revenue by 2%',
    measuredMetric: MetricTypeEnum.SHOPIFY_PLACED_ORDER_VALUE,
    measuredValue: 1,
    completionStages: 3,
    completionCount: 2,
  },
  {
    ...defaults,
    name: 'Increase product ordered value by 5%',
    measuredMetric: MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT_VALUE,
  },

  {
    ...defaults,
    name: 'Publish 2 newsletters',
    measuredMetric: MetricTypeEnum.POST_PUBLISHED,
    completionCount: 2,
    completionStages: 3,
    measuredUnit: ChallengeMeasuredValueUnit.RATE,
    measuredValue: 1,
    isHidden: false,
  },
];
