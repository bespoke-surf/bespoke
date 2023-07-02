import { PricingIdType } from '@bespoke/common/dist/pricingPlan';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { BillingPlanStatus } from './enum/billingPlanStatus.enum';
import { BillingSubscriptionEntity } from './enum/billingSubscriptionEntity.enum';
import { BillingSubscriptionStatus } from './enum/billingSubscriptionStatus.enum';

@ObjectType()
@Entity()
export class Billing {
  @Field(() => BillingPlanStatus)
  billingPlanStatus: BillingPlanStatus;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'enum',
    enum: BillingSubscriptionStatus,
    default: BillingSubscriptionStatus.UNSUBSCRIBED,
  })
  billingSubscriptionStatus: BillingSubscriptionStatus;

  @Field(() => BillingSubscriptionEntity, { nullable: true })
  @Column({ type: 'enum', enum: BillingSubscriptionEntity, nullable: true })
  billingSubscriptionEntity?: BillingSubscriptionEntity;

  @Field({ nullable: true })
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  currentPeriodEnd?: Date;

  @Field()
  @Column({ default: false })
  cancelAtPeriodEnd: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subscriptionId?: string;

  @Field()
  @Column()
  bespokePlanId: PricingIdType;

  @OneToOne(() => Store, (store) => store.billing, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;
}
