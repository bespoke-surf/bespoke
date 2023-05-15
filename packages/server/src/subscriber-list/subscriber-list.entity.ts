import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../list/list.entity';
import { Subscriber } from '../subscriber/subscriber.entity';
import { EmailConcentCollectedFrom } from './enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from './enum/emailConcentOptInLevel.enum';
import { EmailConcentState } from './enum/emailConcentState.enum';

@ObjectType({
  description: 'Subscriber List',
})
@Entity()
export class SubscriberList {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  listId: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  subscriberId: string;

  @Field(() => List)
  @ManyToOne(() => List, (list) => list.subscriberList, {
    onDelete: 'CASCADE',
  })
  list: Relation<List>;

  @Field(() => Subscriber)
  @ManyToOne(() => Subscriber, (subscriber) => subscriber.subscriberList, {
    onDelete: 'CASCADE',
  })
  subscriber: Relation<Subscriber>;

  @Field(() => EmailConcent)
  @OneToOne(() => EmailConcent, (emailConcent) => emailConcent.subscriberList, {
    nullable: true,
  })
  @JoinColumn()
  emailConcent: Relation<EmailConcent>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

@ObjectType({
  description: 'email concent',
})
@Entity()
export class EmailConcent {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => EmailConcentState)
  @Column({ type: 'enum', enum: EmailConcentState })
  state: EmailConcentState;

  @Field(() => EmailConcentOptInLevel)
  @Column({ type: 'enum', enum: EmailConcentOptInLevel })
  optInLevel: EmailConcentOptInLevel;

  @Field(() => EmailConcentCollectedFrom)
  @Column({ type: 'enum', enum: EmailConcentCollectedFrom })
  collectedFrom: EmailConcentCollectedFrom;

  @OneToOne(
    () => SubscriberList,
    (subscriberList) => subscriberList.emailConcent,
    { onDelete: 'CASCADE' },
  )
  subscriberList: Relation<SubscriberList>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

/*
marked as spam - 
global supression:   marked as spam

bounced or invalid-
user global supression:  bounced or invalid;

unsubscribed-
subscribe list - unsubscribed

marked as spam
email bounced
unsubscribed
subscribed

user - supression: email bounced/subscribed
subscriber - supression: marked as spam/subscribed
subscriber list - unsubscribed/subscribed 

if sublist new user added, sub is subscrbed
if email hard bounced then will never send email to user anymore.

*/
