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
import { List } from '../list/list.entity';
import { Post } from '../post/post.entity';

//  post - post-list - list
// this shows us which post was sent to which list
// recorded during user sends emails to a list.
@ObjectType({
  description: 'Subscriber List',
})
@Entity()
export class PostList {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  listId: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  postId: string;

  @Field(() => List)
  @ManyToOne(() => List, (list) => list.postList, {
    onDelete: 'CASCADE',
  })
  list: Relation<List>;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.postList, {
    onDelete: 'CASCADE',
  })
  post: Relation<Post>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
