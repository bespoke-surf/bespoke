import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Metric } from '../metric/metric.entity';
import { PostList } from '../post-list/post-list.entity';
import { SignupForm } from '../signup-form/signup-form.entity';
import { Store } from '../store/store.entity';
import { SubscriberList } from '../subscriber-list/subscriber-list.entity';

@ObjectType({
  description: 'List',
})
@Entity()
export class List {
  @Field()
  addedToday: string;

  @Field()
  addedThisWeek: string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Int)
  members: number;

  @Field()
  @Column({ default: false })
  isDefaultStoreList: boolean;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: false })
  starred: boolean;

  @Column({ type: 'uuid' })
  storeId: string;

  @Field(() => Store, { nullable: true })
  @ManyToOne(() => Store, (store) => store.list, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @OneToMany(() => SubscriberList, (subscriberList) => subscriberList.list)
  subscriberList: Relation<SubscriberList[]>;

  @OneToMany(() => PostList, (postList) => postList.list)
  postList: Relation<PostList[]>;

  @OneToMany(() => Metric, (metric) => metric.list)
  metric: Relation<Metric[]>;

  @OneToMany(() => SignupForm, (signupForm) => signupForm.list)
  signupForm: Relation<SignupForm[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
