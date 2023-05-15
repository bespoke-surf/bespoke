import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { StoreItem } from '../store-item/store-item.entity';
import { Store } from '../store/store.entity';

@ObjectType({
  description: 'Credit',
})
@Entity()
export class Credit {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'uuid' })
  storeId: string;

  @Field()
  @Column({ default: 0 })
  credited: number;

  @Field()
  @Column({ default: 0 })
  debited: number;

  @ManyToOne(() => Store, (store) => store.credit)
  store: Relation<Store>;

  @OneToOne(() => StoreItem, (storeItem) => storeItem.credit, {
    nullable: true,
  })
  storeItem?: StoreItem;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
