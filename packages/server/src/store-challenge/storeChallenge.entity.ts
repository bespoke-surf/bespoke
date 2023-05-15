import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Challenge } from '../challenge/challenge.entity';
import { Store } from '../store/store.entity';

@ObjectType({
  description: 'Store challenge',
})
@Entity()
export class StoreChallenge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  completedCount: number;

  @Field()
  @Column()
  completedStages: number;

  @Field()
  @Column()
  storeId: string;

  @Field()
  @Column()
  challengeId: string;

  @Field()
  @Column({ default: false })
  allCompleted: boolean;

  @ManyToOne(() => Store, (store) => store.storeChallenge, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.storeChallenge, {
    onDelete: 'CASCADE',
  })
  challenge: Relation<Challenge>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
