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
} from 'typeorm';
import { Credit } from '../credit/credit.entity';
import { Item } from '../item/items.entity';
import { Store } from '../store/store.entity';

@ObjectType({
  description: 'Store challenge',
})
@Entity()
export class StoreItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  storeId: string;

  @Field()
  @Column()
  itemId: string;

  @ManyToOne(() => Store, (store) => store.storeChallenge, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.storeItem, {
    onDelete: 'CASCADE',
  })
  item: Relation<Item>;

  @OneToOne(() => Credit, (credit) => credit.storeItem, {
    nullable: true,
  })
  @JoinColumn()
  credit?: Credit;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
