import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Integration } from '../integration/integration.entity';

@ObjectType({ description: 'Shopify' })
@Entity()
export class Shopify {
  @Field()
  sessionExpired: boolean;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  listIdToCollectEmail?: string | null;

  @Field(() => String)
  @Column()
  storeUrl: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  productSyncJobId?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'text' })
  customerSyncJobId?: string | null;

  @Field(() => Boolean)
  @Column({ default: false })
  authenticated: boolean;

  @OneToOne(() => Integration, (integration) => integration.shopify, {
    onDelete: 'CASCADE',
  })
  integration: Relation<Integration>;
}
