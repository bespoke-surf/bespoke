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
import { Metric } from '../metric/metric.entity';
import { PostList } from '../post-list/post-list.entity';
import { ProductPost } from '../product-post/product-post.entity';
import { Store } from '../store/store.entity';
import { PostStateEnum } from './enum/postStateEnum';
import { PostTypeEnum } from './enum/postTypeEnum';

@ObjectType()
class PostImage {
  @Field()
  src: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;
}

@ObjectType({
  description: 'Post',
})
@Entity()
export class Post {
  @Field(() => Int)
  postViewCount: number;

  @Field(() => Int)
  postRecipientCount: number;

  @Field(() => Int)
  postOpenCount: number;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  subTitle?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bodyLexical?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  postHandle?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bodyHTML?: string;

  @Field(() => PostStateEnum)
  @Column({ enum: PostStateEnum, type: 'enum', default: PostStateEnum.DRAFT })
  postState: PostStateEnum;

  @Field(() => PostTypeEnum)
  @Column({ enum: PostTypeEnum, type: 'enum', default: PostTypeEnum.POST })
  postType: PostTypeEnum;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: 'timestamptz' })
  publishedDate?: Date;

  @Field(() => String)
  @Column({ type: 'uuid' })
  storeId: string;

  @Field(() => PostImage, { nullable: true })
  @Column({ nullable: true, type: 'jsonb' })
  image?: PostImage;

  @Field(() => Store, { nullable: true })
  @ManyToOne(() => Store, (store) => store.post, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @OneToMany(() => ProductPost, (productPost) => productPost.post)
  productPost: Relation<ProductPost>;

  @OneToMany(() => PostList, (postList) => postList.post)
  postList: Relation<PostList[]>;

  @OneToMany(() => Metric, (metric) => metric.post)
  metric: Relation<Metric[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
