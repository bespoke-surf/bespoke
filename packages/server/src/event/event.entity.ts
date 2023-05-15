import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from '../user/user.entity';
import { EventAccessRestriction } from './enum/eventConfidentiality';
import { EventState } from './enum/eventState.enum';
import { EventType } from './enum/eventType.enum';

@ObjectType({
  description: 'Event',
})
@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => EventType)
  @Column({
    type: 'enum',
    enum: EventType,
  })
  eventType: EventType;

  @Field()
  @Column()
  message: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link: string;

  @Field(() => EventState)
  @Column({ type: 'enum', enum: EventState })
  eventState: EventState;

  @Field(() => EventAccessRestriction)
  @Column({ type: 'enum', enum: EventAccessRestriction })
  eventAccessRestriction: EventAccessRestriction;

  @Column({ type: 'uuid' })
  eventProducerId: string;

  @Field()
  @Column({ default: false })
  showAsNotification: boolean;

  @Field()
  @Column({ default: false })
  notificationDismissed: boolean;

  @Field()
  @Column({ default: false })
  notificationRead: boolean;

  @Field()
  @Column({ type: 'uuid' })
  userId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.event, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;
}
