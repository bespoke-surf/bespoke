import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { AboutIndustryEnum } from './enum/industry.enum';

@ObjectType()
@Entity()
export class About {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  aboutLexical?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  aboutHTML?: string;

  @Field({ nullable: true })
  @Column({ type: 'enum', enum: AboutIndustryEnum, nullable: true })
  industry?: string;

  @OneToOne(() => Store, (store) => store.about, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;
}
