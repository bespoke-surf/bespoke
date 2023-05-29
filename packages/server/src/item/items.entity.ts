import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { StoreItem } from '../store-item/store-item.entity';
import { ItemDataUnion } from './enums/itemData';
import { ItemTypeEnum } from './enums/type';

@ObjectType()
export class ItemImageData {
  @Field()
  src: string;

  @Field()
  width: number;

  @Field()
  height: number;
}

@ObjectType({
  description: 'Item',
})
@Entity()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  credits?: number;

  @Field(() => [ItemImageData])
  @Column({ type: 'jsonb' })
  imageData: ItemImageData[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => ItemDataUnion)
  @Column({ type: 'jsonb' })
  data: typeof ItemDataUnion;

  @Field(() => ItemTypeEnum)
  @Column({ type: 'enum', enum: ItemTypeEnum })
  type: ItemTypeEnum;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  start_date?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  end_date?: Date;

  @Field()
  @Column()
  itemCategoryId: string;

  @Field(() => ItemCategory)
  @ManyToOne(() => ItemCategory, (itemCategory) => itemCategory.items)
  itemCategory: Relation<ItemCategory>;

  @OneToMany(() => StoreItem, (storeItem) => storeItem.item)
  storeItem: Relation<StoreItem[]>;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
