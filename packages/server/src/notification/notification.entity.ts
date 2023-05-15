import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../store/store.entity';

@ObjectType()
@Entity()
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ default: true })
  newSubscriber: boolean;

  @OneToOne(() => Store, (store) => store.notification, {
    onDelete: 'CASCADE',
  })
  store: Store;
}
