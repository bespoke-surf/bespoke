import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { About } from '../about/about.entity';
import { ApiKey } from '../apiKey/apiKey.entity';
import { Billing } from '../billing/billing.entity';
import { Credit } from '../credit/credit.entity';
import { Integration } from '../integration/integration.entity';
import { List } from '../list/list.entity';
import { Metric } from '../metric/metric.entity';
import { Notification } from '../notification/notification.entity';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { SignupForm } from '../signup-form/signup-form.entity';
import { StoreChallenge } from '../store-challenge/storeChallenge.entity';
import { StoreItem } from '../store-item/store-item.entity';
import { Subscriber } from '../subscriber/subscriber.entity';
import { User } from '../user/user.entity';
import { Workflow } from '../workflow/workflow.entity';
import { ContactLimitStatus } from './enum/contactLimitStatus.enum';
import { StoreCurrency } from './enum/currency.enum';
import { EmailSentLimitStatus } from './enum/emailSentLimitStatus.enum';

@ObjectType()
@Entity()
export class Store {
  //resolved field
  @Field({ nullable: true })
  userId?: string;

  @Field(() => ContactLimitStatus)
  contactLimitStatus: ContactLimitStatus;

  @Field(() => EmailSentLimitStatus)
  emailSentLimitStatus: EmailSentLimitStatus;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, type: 'text', nullable: true })
  subdomain?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  shortId?: string;

  @Field(() => StoreCurrency)
  @Column({ type: 'enum', enum: StoreCurrency, default: StoreCurrency.USD })
  currency: StoreCurrency;

  @Field(() => String, { nullable: true })
  defaultListIdToCollectEmail?: string | null;

  @Field(() => DisplayPicture, { nullable: true })
  @OneToOne(() => DisplayPicture, (dp) => dp.store)
  @JoinColumn()
  displayPicture?: Relation<DisplayPicture> | null;

  @Field(() => About, { nullable: true })
  @OneToOne(() => About, (about) => about.store, { nullable: true })
  @JoinColumn()
  about?: Relation<About> | null;

  @Field(() => Contact, { nullable: true })
  @OneToOne(() => Contact, (contact) => contact.store)
  @JoinColumn()
  contact: Relation<Contact> | null;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.store, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @OneToMany(() => StoreChallenge, (storeChallenge) => storeChallenge.store)
  storeChallenge: Relation<StoreChallenge[]>;

  @OneToMany(() => StoreItem, (storeItem) => storeItem.store)
  storeItem: Relation<StoreItem[]>;

  @OneToMany(() => Post, (post) => post.store)
  post: Relation<Post[]>;

  @OneToMany(() => Subscriber, (subscriber) => subscriber.store)
  subscriber: Relation<Subscriber[]>;

  @OneToMany(() => Product, (product) => product.store)
  product: Relation<Product[]>;

  @OneToMany(() => Credit, (credit) => credit.store)
  credit: Relation<Credit[]>;

  @OneToMany(() => SignupForm, (signupForm) => signupForm.store)
  signupForm: Relation<SignupForm[]>;

  @OneToMany(() => List, (list) => list.store)
  list: Relation<List[]>;

  @OneToMany(() => Workflow, (workflow) => workflow.store)
  workflow: Relation<Workflow[]>;

  @OneToMany(() => Metric, (metric) => metric.store)
  metric: Relation<Metric[]>;

  @OneToMany(() => ApiKey, (apiKey) => apiKey.store)
  apiKey: Relation<ApiKey[]>;

  @OneToOne(() => Integration, (integration) => integration.store, {
    nullable: true,
  })
  @JoinColumn()
  integration?: Relation<Integration>;

  @OneToOne(() => Billing, (billing) => billing.store, {
    nullable: true,
  })
  @JoinColumn()
  billing?: Relation<Billing> | null;

  @OneToOne(() => Notification, (notification) => notification.store, {
    nullable: true,
  })
  @JoinColumn()
  notification?: Relation<Notification> | null;
}

@ObjectType()
@Entity()
export class DisplayPicture {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  height: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  width: number;

  @Field(() => String)
  @Column({ type: 'text' })
  src: string;

  @OneToOne(() => Store, (store) => store.displayPicture, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;
}

@ObjectType()
@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  senderName: string;

  @Field()
  @Column()
  senderEmail: string;

  @Field()
  @Column()
  address1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address2?: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  state?: string;

  @Field()
  @Column()
  zipCode: string;

  @OneToOne(() => Store, (store) => store.contact, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;
}
