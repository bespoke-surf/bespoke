import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../event/event.entity';
import { Store } from '../store/store.entity';
import { Subscriber } from '../subscriber/subscriber.entity';
import { EmailDeliveryStatus } from './enum/emailDeliveryStatus.enum';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => String)
  unlayerSignature: string;

  @Column({ nullable: true })
  stripeCustomerId?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @Field(() => Store, { nullable: true })
  @OneToOne(() => Store, (store) => store.user, {
    nullable: true,
  })
  @JoinColumn()
  store?: Relation<Store>;

  @OneToMany(() => Subscriber, (subscriber) => subscriber.user)
  subscriber: Relation<Subscriber[]>;

  @OneToMany(() => Event, (event) => event.user)
  event: Relation<Event[]>;

  @Field(() => UserEmailDeliveryStatus)
  @OneToOne(
    () => UserEmailDeliveryStatus,
    (userEmailDeliveryStatus) => userEmailDeliveryStatus.user,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  userEmailDeliveryStatus: Relation<UserEmailDeliveryStatus>;
}

@ObjectType({
  description: 'user email delivery status',
})
@Entity()
export class UserEmailDeliveryStatus {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => EmailDeliveryStatus)
  @Column({
    type: 'enum',
    enum: EmailDeliveryStatus,
    default: EmailDeliveryStatus.SUBSCRIBED,
  })
  emailDeliveryStatus: EmailDeliveryStatus;

  @Field(() => Int)
  @Column({ default: 0 })
  softBounceCount: number;

  @OneToOne(() => User, (user) => user.userEmailDeliveryStatus, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
