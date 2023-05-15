import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPost } from './product-post.entity';

@Injectable()
export class ProductPostService {
  constructor(
    @InjectRepository(ProductPost)
    private readonly productPostRepo: Repository<ProductPost>,
  ) {}

  async hasProductPost(subdomain: string): Promise<boolean> {
    const productPost = await this.productPostRepo.findOne({
      where: {
        post: {
          store: {
            subdomain,
          },
        },
      },
    });
    if (productPost) return true;
    return false;
  }

  async createProductPost(
    productIds: string[],
    postId: string,
    nodeKey: string,
  ): Promise<null> {
    for (const productId of productIds) {
      const seeIfAlreadyHasRelation = await this.productPostRepo.findOne({
        where: {
          productId,
          postId,
        },
      });

      if (!seeIfAlreadyHasRelation) {
        await this.productPostRepo.save({
          postId,
          productId,
          nodeKey,
        });
      }
    }

    return null;
  }

  async deleteProductPost(postId: string, nodeKey: string): Promise<null> {
    const productPostWithKey = await this.productPostRepo.find({
      where: {
        postId,
        nodeKey,
      },
    });
    for (const productPost of productPostWithKey) {
      await this.productPostRepo.remove(productPost);
    }
    return null;
  }
}
