import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { MetricTypeEnum } from '../metric/enum/metric-type.enum';
import { Quest } from '../quest/quests.entity';
import { StoreChallenge } from '../store-challenge/storeChallenge.entity';
import { ChallengeTypeEnum } from './enum/challengeType.enum';
import { ChallengeMeasuredValueUnit } from './enum/criteriaType.enum';

@ObjectType({
  description: 'Product in posts',
})
@Entity()
export class Challenge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  measuredValue?: number;

  @Field()
  @Column({ default: 1 })
  completionCount: number;

  @Field()
  @Column({ default: 1 })
  completionStages: number;

  @Field(() => ChallengeTypeEnum)
  @Column({ type: 'enum', enum: ChallengeTypeEnum })
  challengeType: ChallengeTypeEnum;

  @Field(() => ChallengeMeasuredValueUnit, { nullable: true })
  @Column({ type: 'enum', enum: ChallengeMeasuredValueUnit, nullable: true })
  measuredUnit?: ChallengeMeasuredValueUnit; // percnetage or rate

  @Field(() => MetricTypeEnum, { nullable: true })
  @Column({ type: 'enum', enum: MetricTypeEnum, nullable: true })
  measuredMetric?: MetricTypeEnum; // email bounced etc..

  @Field()
  @Column({ default: false })
  isHidden: boolean;

  @Field()
  @Column()
  questId: string;

  @ManyToOne(() => Quest, (quest) => quest.challenges, { onDelete: 'CASCADE' })
  quest: Relation<Quest>;

  @OneToMany(() => StoreChallenge, (storeChallenge) => storeChallenge.challenge)
  storeChallenge: Relation<StoreChallenge[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
