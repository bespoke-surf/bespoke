import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../list/list.entity';
import { Metric } from '../metric/metric.entity';
import { Store } from '../store/store.entity';
import { SignupFormState } from './enum/signupFormState.enum';

@ObjectType()
export class SignupFormData {
  @Field()
  body: string;

  @Field()
  css: string;

  @Field()
  js: string;

  @Field()
  fonts: string;

  @Field()
  design: string;

  @Field()
  html: string;
}

@ObjectType({
  description: 'Signup Form',
})
@Entity()
export class SignupForm {
  @Field()
  formSubmitRate: number;

  @Field(() => Int)
  views: number;

  @Field(() => Int)
  submitted: number;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => SignupFormState)
  @Column({ enum: SignupFormState, type: 'enum' })
  formState: SignupFormState;

  @Field({ nullable: true })
  @Column({ nullable: true })
  scriptModule?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  scriptJavascript?: string;

  @Field(() => SignupFormData, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  form?: SignupFormData;

  @Field(() => SignupFormData, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  success?: SignupFormData;

  @Column({ type: 'uuid' })
  storeId: string;

  @Column({ type: 'uuid' })
  listId: string;

  @Field(() => Store, { nullable: true })
  @ManyToOne(() => Store, (store) => store.signupForm, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field(() => List, { nullable: true })
  @ManyToOne(() => List, (list) => list.signupForm, {
    onDelete: 'CASCADE',
  })
  list: Relation<List>;

  @OneToMany(() => Metric, (metric) => metric.signupForm)
  metric: Relation<Metric[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
