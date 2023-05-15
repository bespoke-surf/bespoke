import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';

@ObjectType({
  description: 'Product in posts',
})
@Entity()
export class ProductPost {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  productId: string;

  @Field()
  @Column()
  nodeKey: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  postId: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.productPost, {
    onDelete: 'CASCADE',
  })
  post: Relation<Post>;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.productPost, {
    onDelete: 'CASCADE',
  })
  product: Relation<Product>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
