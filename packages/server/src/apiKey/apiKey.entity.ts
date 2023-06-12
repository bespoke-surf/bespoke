import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { ApiAccessLevel } from './enum/apiAccessLevel';
import { ApiKeyAccessScopeEnum } from './enum/apikScopeEnum';

@ObjectType()
@Entity()
export class ApiKey {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  key: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  lastUsed?: Date;

  @Field(() => [ApiKeyAccessScopeEnum])
  @Column({
    type: 'enum',
    enum: ApiKeyAccessScopeEnum,
    array: true,
  })
  scopes: ApiKeyAccessScopeEnum[];

  @Field(() => ApiAccessLevel)
  @Column({
    type: 'enum',
    enum: ApiAccessLevel,
  })
  accessLevel: ApiAccessLevel;

  @Field()
  @Column()
  storeId: string;

  @ManyToOne(() => Store, (store) => store.apiKey, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @Field({ nullable: false })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;
}
