import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { List } from '../list/list.entity';
import { Post } from '../post/post.entity';
import { SignupForm } from '../signup-form/signup-form.entity';
import { Store } from '../store/store.entity';
import { Subscriber } from '../subscriber/subscriber.entity';
import { MetricTypeEnum } from './enum/metric-type.enum';
import { MetricData } from './union/metricData.union';

@ObjectType({
  description: 'Subscriber Metric',
})
@Entity()
export class Metric {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => MetricTypeEnum)
  @Column({ enum: MetricTypeEnum, type: 'enum' })
  metricType: MetricTypeEnum;

  @Field()
  @Column()
  message: string;

  @Field(() => MetricData, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  data?: typeof MetricData;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  signupFormId?: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  subscriberId?: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  listId?: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  postId?: string;

  @Field()
  @Column({ type: 'uuid' })
  storeId: string;

  @Field(() => List, { nullable: true })
  @ManyToOne(() => List, (list) => list.metric, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  list?: Relation<List>;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.metric, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  post?: Relation<Post>;

  @Field(() => Subscriber, { nullable: true })
  @ManyToOne(() => Subscriber, (subscriber) => subscriber.metric, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  subscriber?: Relation<Subscriber>;

  @Field(() => SignupForm, { nullable: true })
  @ManyToOne(() => SignupForm, (signupForm) => signupForm.metric, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  signupForm?: Relation<SignupForm>;

  @ManyToOne(() => Store, (store) => store.metric, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
