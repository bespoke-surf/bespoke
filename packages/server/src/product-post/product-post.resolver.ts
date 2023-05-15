import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithPost } from '../guard/hasStoreAccessWithPost';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { ProductPost } from './product-post.entity';
import { ProductPostService } from './product-post.service';

@Resolver()
export class ProductPostResolver {
  constructor(private readonly productPostService: ProductPostService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Boolean, {
    nullable: true,
  })
  hasProductPost(@Args('subdomain') subdomain: string): Promise<boolean> {
    return this.productPostService.hasProductPost(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  @Mutation(() => ProductPost, { nullable: true })
  createProductPost(
    @Args('postId') postId: string,
    @Args('productIds', { type: () => [String] }) productIds: string[],
    @Args('nodeKey') nodeKey: string,
  ): Promise<null> {
    return this.productPostService.createProductPost(
      productIds,
      postId,
      nodeKey,
    );
  }

  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  @Mutation(() => ProductPost, { nullable: true })
  deleteProductPost(
    @Args('postId') postId: string,
    @Args('nodeKey') nodeKey: string,
  ): Promise<null> {
    return this.productPostService.deleteProductPost(postId, nodeKey);
  }
}
