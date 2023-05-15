import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Item } from '../item/items.entity';
import { ItemCategoryTypeEnum } from './enum/itemCategoryType';

@ObjectType({
  description: 'ItemCategory',
})
@Entity()
export class ItemCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => ItemCategoryTypeEnum)
  @Column({ type: 'enum', enum: ItemCategoryTypeEnum })
  type: ItemCategoryTypeEnum;

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.itemCategory)
  items: Relation<Item[]>;
}
