import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Challenge } from '../challenge/challenge.entity';
import { QuestType } from './enum/questType.enum';

@ObjectType({
  description: 'Product in posts',
})
@Entity()
export class Quest {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => QuestType)
  @Column({ type: 'enum', enum: QuestType })
  questType: QuestType;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.quest)
  challenges: Relation<Challenge[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
