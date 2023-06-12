import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  FindOptionsSelect,
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

export const listSelect: FindOptionsSelect<List> = {
  id: true,
  isDefaultStoreList: true,
  name: true,
  starred: true,
  createdAt: true,
  updatedAt: true,
};

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

  @ApiProperty()
  @Field()
  @Column({ default: false })
  isDefaultStoreList: boolean;

  @ApiProperty()
  @Field()
  @Column()
  name: string;

  @ApiProperty()
  @Field()
  @Column({ default: false })
  starred: boolean;

  @Column({ type: 'uuid' })
  storeId: string;

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

  @ApiProperty()
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
