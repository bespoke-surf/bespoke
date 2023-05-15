import { Field, InputType } from '@nestjs/graphql';
import { MetricTypeEnum } from '../../metric/enum/metric-type.enum';
import { Challenge } from '../challenge.entity';
import { ChallengeTypeEnum } from '../enum/challengeType.enum';
import { ChallengeMeasuredValueUnit } from '../enum/criteriaType.enum';

@InputType({ description: 'create task challenge input' })
export class CreateChallengeInput implements Partial<Challenge> {
  @Field()
  name: string;

  @Field()
  measuredValue: number;

  @Field()
  completionCount: number;

  @Field()
  completionStages: number;

  @Field(() => ChallengeMeasuredValueUnit)
  measuredUnit: ChallengeMeasuredValueUnit; // percnetage or value

  @Field(() => MetricTypeEnum)
  measuredMetric: MetricTypeEnum; // email bounced etc..

  @Field(() => ChallengeTypeEnum)
  challengeType: ChallengeTypeEnum;

  @Field()
  isHidden: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field()
  rewardXP: number;

  @Field()
  questId: string;
}
