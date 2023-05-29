import { CreateChallengeInput } from '../../challenge/dto/createTaskChallengeInput';
import { ChallengeTypeEnum } from '../../challenge/enum/challengeType.enum';
import { ChallengeMeasuredValueUnit } from '../../challenge/enum/criteriaType.enum';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';

// 1% growth
const defaults = {
  rewardXP: 1000,
  measuredUnit: ChallengeMeasuredValueUnit.PERCENTAGE,
  completionCount: 1,
  completionStages: 1,
  measuredValue: 1,
  isHidden: true,
  challengeType: ChallengeTypeEnum.CHALLENGE,
};

export const dailyChallenges: Omit<CreateChallengeInput, 'questId'>[] = [
  {
    ...defaults,
    name: 'Increase email open rate by 1%',
    measuredMetric: MetricTypeEnum.EMAIL_OPENED,
    isHidden: false, // this is false coz it was initial
  },
  {
    ...defaults,
    name: 'Increase email click through rate by 1%',
    measuredMetric: MetricTypeEnum.EMAIL_LINK_CLICKED,
    isHidden: false, // this is false coz it was initial
  },
  {
    ...defaults,
    name: 'Increase email delivery rate by 1%',
    measuredMetric: MetricTypeEnum.EMAIL_DELIVERED,
    isHidden: false, // this is false coz it was initial
  },
  {
    ...defaults,
    name: 'Increase email sent rate by 1%',
    measuredMetric: MetricTypeEnum.EMAIL_SENT,
  },
  // {
  //   ...defaults,
  //   name: 'Increase signup form submission rate by 1%',
  //   measuredMetric: MetricTypeEnum.FORM_SUBMITTED,
  // },
  // {
  //   ...defaults,
  //   name: 'Increase signup form viewed rate by 1%',
  //   measuredMetric: MetricTypeEnum.FORM_VIEWED,
  // },

  {
    ...defaults,
    name: 'Increase newsletter viewed rate by 1%',
    measuredMetric: MetricTypeEnum.POST_VIEWED,
  },
  // {
  //   ...defaults,
  //   name: 'Increase cart order value by 1%',
  //   measuredMetric: MetricTypeEnum.SHOPIFY_CHECKOUT_STARTED,
  // },
  // {
  //   ...defaults,
  //   name: 'Increase fulfilled order value by 1%',
  //   measuredMetric: MetricTypeEnum.SHOPIFY_FULFILLED_ORDER_VALUE,
  // },
  // {
  //   ...defaults,
  //   name: 'Increase product ordered value by 1%',
  //   measuredMetric: MetricTypeEnum.SHOPIFY_ORDERED_PRODUCT_VALUE,
  // },
  // {
  //   ...defaults,
  //   name: 'Increase revenue by 1%',
  //   measuredMetric: MetricTypeEnum.SHOPIFY_PLACED_ORDER_VALUE,
  // },

  {
    ...defaults,
    name: 'Publish 1 newsletter',
    measuredUnit: ChallengeMeasuredValueUnit.RATE,
    measuredMetric: MetricTypeEnum.POST_PUBLISHED,
  },
];
