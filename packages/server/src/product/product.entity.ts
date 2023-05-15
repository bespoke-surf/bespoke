import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ProductPost } from '../product-post/product-post.entity';
import { Store } from '../store/store.entity';
import { CDNType } from './enum/cdnType.enum';
import { ProductSource } from './enum/productSource.enum';
import { ProductType } from './enum/productType.enum';
import { ShopifyProductData } from './type/shopifyProductData';

@ObjectType()
export class DigitalProductFile {
  @Field()
  src: string;

  @Field()
  fileName: string;

  @Field()
  originalFileName: string;

  @Field()
  filePath: string;
}

@ObjectType()
export class ProductDuration {
  @Field(() => Int)
  hours: number;

  @Field(() => Int)
  minutes: number;
}

@ObjectType()
export class ProductImage {
  @Field(() => Int)
  height: number;

  @Field(() => Int)
  width: number;

  @Field()
  src: string;

  @Field()
  mimeType: string;

  @Field(() => CDNType)
  cdnType: CDNType;
}

@ObjectType({
  description: 'Products ',
})
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => ProductType)
  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.EXTERNAL_LINK,
  })
  productType: ProductType;

  // price is always * 100
  @Field(() => Int)
  @Column({ default: 0 })
  price: number;

  @Field(() => ShopifyProductData, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  productData?: ShopifyProductData;

  @Field(() => ProductSource)
  @Column({ enum: ProductSource, type: 'enum' })
  productSource: ProductSource;

  @Field(() => [ProductImage], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  image?: ProductImage[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  rank: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  externalLink?: string;

  @Field()
  @Column({ default: false })
  hidden: boolean;

  @Field()
  @Column()
  storeId: string;

  @ManyToOne(() => Store, (store) => store.product, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @OneToMany(() => ProductPost, (productPost) => productPost.product)
  productPost: Relation<ProductPost>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
