import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Shopify } from '../shopify/shopify.entity';
import { Store } from '../store/store.entity';

@ObjectType({
  description: 'Integration',
})
@Entity()
export class Integration {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Shopify, { nullable: true })
  @OneToOne(() => Shopify, (shopify) => shopify.integration, {
    nullable: true,
  })
  @JoinColumn()
  shopify?: Relation<Shopify>;

  @OneToOne(() => Store, (store) => store.integration, { onDelete: 'CASCADE' })
  store: Relation<Store>;
}
