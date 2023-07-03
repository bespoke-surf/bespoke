import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUserId } from '../decorator/currentUserId';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithPost } from '../guard/hasStoreAccessWithPost';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { CreatePostInput } from './dto/createPostInput';
import { CreatePostViewedInput } from './dto/createPostViewedInput';
import { UpdatePostInput } from './dto/updatePost';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    @Inject(PostService)
    private readonly postService: PostService,
  ) {}

  @ResolveField()
  async postViewCount(post: Post): Promise<number> {
    return await this.postService.getUniquePostViewCount(post.id);
  }

  @ResolveField()
  async postRecipientCount(post: Post): Promise<number> {
    return await this.postService.getPostRecipientCount(post.id);
  }

  @ResolveField()
  async postOpenCount(post: Post): Promise<number> {
    return await this.postService.getPostOpenCount(post.id);
  }

  @Query(() => [Post], {
    nullable: true,
    description: 'get all posts for sitemap',
  })
  async getAllPublishedPostForSiteMap(): Promise<Post[] | null> {
    return this.postService.getAllPublishedPostForSiteMap();
  }

  @Query(() => [Post], {
    nullable: true,
    description: 'get post',
  })
  async getPosts(
    @Args('subdomain') subdomain: string,
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
  ): Promise<Post[] | null> {
    return this.postService.getPosts(subdomain, take, skip);
  }

  @Query(() => Post, {
    nullable: true,
    description: 'get post',
  })
  async getPostByHandle(
    @Args('postHandle') handle: string,
  ): Promise<Post | null> {
    return this.postService.getPostByHandle(handle);
  }

  @Query(() => [Post], {
    nullable: true,
    description: 'get more post',
  })
  async getMorePosts(
    @Args('postHandle') postHandle: string,
  ): Promise<Post[] | null> {
    return this.postService.getMorePosts(postHandle);
  }

  @Query(() => Post, {
    nullable: true,
    description: 'get post',
  })
  async getPost(@Args('postId') postId: string): Promise<Post | null> {
    return this.postService.getPost(postId);
  }

  @Query(() => [Post], {
    nullable: true,
    description: 'get draft posts',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  async getDraftPosts(
    @Args('subdomain') subdomain: string,
    @CurrentUserId() userId: string,
  ): Promise<Post[] | null> {
    return this.postService.getDraftPosts(subdomain, userId);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Post, {
    nullable: true,
    description: 'create post',
  })
  async createPost(
    @Args('input', { type: () => CreatePostInput }) input: CreatePostInput,
  ): Promise<Post | null> {
    return this.postService.createPost(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  @Mutation(() => Boolean, {
    description: 'update post',
  })
  async updatePost(@Args('input') input: UpdatePostInput): Promise<boolean> {
    return this.postService.updatePost(input);
  }

  @Mutation(() => Post, {
    nullable: true,
    description: 'unpublish post',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  async unpublishPost(@Args('postId') postId: string): Promise<Post | null> {
    return this.postService.unPublishPost(postId);
  }

  @Mutation(() => Post, {
    nullable: true,
    description: 'delete post',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  async deletePost(@Args('postId') postId: string): Promise<Post | null> {
    return this.postService.deletePost(postId);
  }

  @Mutation(() => Boolean, {
    description: 'check post handle avaialb',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithPost)
  async checkPostHandleAvailable(
    @Args('postId') postId: string,
    @Args('handle') handle: string,
  ): Promise<boolean> {
    return this.postService.checkPostHandleAvailable(postId, handle);
  }

  @Mutation(() => Post, {
    nullable: true,
    description: 'create post viewed',
  })
  createPostViewed(@Args('input') input: CreatePostViewedInput): Promise<null> {
    return this.postService.createPostViewed(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    nullable: true,
    description: 'get post count',
  })
  getPostCount(@Args('subdomain') subdomain: string): Promise<number> {
    return this.postService.getPostCount(subdomain);
  }
}
