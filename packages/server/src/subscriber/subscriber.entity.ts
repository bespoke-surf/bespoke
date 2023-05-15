import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLPhoneNumber } from 'graphql-scalars';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Metric } from '../metric/metric.entity';
import { Store } from '../store/store.entity';
import { SubscriberList } from '../subscriber-list/subscriber-list.entity';
import { User } from '../user/user.entity';
import { SubscriberEmailStatus } from './enum/emailStatus.enum';
import { SubscriberTypeEnum } from './enum/subscriberType.enum';

@ObjectType({
  description: 'Subscriber',
})
@Entity()
export class Subscriber {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => SubscriberTypeEnum)
  @Column({
    type: 'enum',
    enum: SubscriberTypeEnum,
    default: SubscriberTypeEnum.FREE,
  })
  subscriberType: SubscriberTypeEnum;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  lastName?: string | null | undefined;

  @Field(() => String)
  @Column({ type: 'uuid' })
  storeId: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  userId: string;

  @Field(() => GraphQLPhoneNumber, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  phoneNumber?: string | null | undefined;

  @OneToMany(
    () => SubscriberList,
    (subscriberList) => subscriberList.subscriber,
  )
  subscriberList: Relation<SubscriberList[]>;

  @OneToMany(() => Metric, (metric) => metric.subscriber)
  metric: Relation<Metric[]>;

  @Field(() => SubscriberEmailStatus)
  @Column({
    type: 'enum',
    enum: SubscriberEmailStatus,
    default: SubscriberEmailStatus.SUBSCRIBED,
  })
  emailStatus: SubscriberEmailStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscriber, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => Store, (store) => store.subscriber, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field(() => SubscriberAddress, { nullable: true })
  @OneToOne(
    () => SubscriberAddress,
    (subscriberAddress) => subscriberAddress.subscriber,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  subscriberAddress: Relation<SubscriberAddress>;
}

@ObjectType({
  description: 'Subscriber Address',
})
@Entity()
export class SubscriberAddress {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  address1?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  address2?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  city?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  country?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  state?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  zipCode?: string | null | undefined;

  @OneToOne(() => Subscriber, (subscriber) => subscriber.subscriberAddress, {
    onDelete: 'CASCADE',
  })
  subscriber: Relation<Subscriber>;
}
