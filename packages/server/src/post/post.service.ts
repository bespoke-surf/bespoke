import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { MetricService } from '../metric/metirc.service';
import { CreatePostInput } from './dto/createPostInput';
import { CreatePostViewedInput } from './dto/createPostViewedInput';
import { UpdatePostInput } from './dto/updatePost';
import { PostStateEnum } from './enum/postStateEnum';
import { PostTypeEnum } from './enum/postTypeEnum';
import { Post } from './post.entity';
import {
  POST_DELETE_EVENT,
  POST_PUBLISH_EVENT,
  POST_UNPUBLISH_EVENT,
} from './post.listner';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    private eventEmitter: EventEmitter2,
    private metricService: MetricService,
  ) {}

  async emitEvent(eventName: string, postId: string) {
    const getPost = await this.postRepo.findOne({
      where: { id: postId },
      relations: { store: { user: true } },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async getPost(postId: string, withDeleted = false): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      withDeleted,
    });
    if (post) return post;
    return null;
  }

  async getPostWithStoreDetails(postId: string): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: {
        store: {
          contact: true,
          user: true,
        },
      },
    });
    if (post) return post;
    return null;
  }

  async getPosts(
    subdomain: string,
    take: number,
    skip: number,
  ): Promise<Post[] | null> {
    const post = await this.postRepo.find({
      where: {
        postState: PostStateEnum.PUBLISHED,
        store: { subdomain },
        postType: PostTypeEnum.POST,
      },
      take,
      skip,
      order: {
        publishedDate: 'DESC',
      },
    });

    return post ?? null;
  }

  async getDraftPosts(
    subdomain: string,
    userId: string,
  ): Promise<Post[] | null> {
    const post = await this.postRepo.find({
      where: {
        postState: Not(PostStateEnum.PUBLISHED),
        postType: PostTypeEnum.POST,
        store: { user: { id: userId }, subdomain },
      },
      order: { createdAt: 'DESC' },
    });
    return post ?? null;
  }

  async createPost(input: CreatePostInput): Promise<Post | null> {
    const post = await this.postRepo.save({
      bodyLexical: input.bodyLexical,
      bodyHTML: input.bodyHTML,
      storeId: input.storeId,
      subTitle: input.subTitle,
      title: input.title,
      postType: PostTypeEnum.POST,
      postState: PostStateEnum.DRAFT,
      image: input.image
        ? {
            height: input.image?.height,
            width: input.image?.width,
            src: input.image?.src,
          }
        : undefined,
    });

    return post;
  }

  async updatePost(input: UpdatePostInput): Promise<boolean> {
    try {
      const post = await this.postRepo.findOne({ where: { id: input.postId } });
      if (!post) return false;

      await this.postRepo.update(input.postId, {
        title: input.title,
        bodyLexical: input.bodyLexical,
        bodyHTML: input.bodyHTML,
        subTitle: input.subTitle,
        image: input.image
          ? {
              height: input.image.height,
              width: input.image.width,
              src: input.image.src,
            }
          : undefined,
      });

      return true;
    } catch {
      return false;
    }
  }

  async publishPost(postId: string, postHandle: string): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
    });

    if (!post) throw new Error();

    const checkAvailable = await this.checkPostHandleAvailable(
      postId,
      postHandle,
    );

    if (!checkAvailable) throw new Error();

    await this.postRepo.update(postId, {
      postState: PostStateEnum.PUBLISHED,
      publishedDate: new Date(),
      postHandle,
    });

    this.metricService.createPostPublishedMetric(
      post.id,
      post.title ?? '',
      post.storeId,
    );

    this.emitEvent(POST_PUBLISH_EVENT, post.id);
    return null;
  }

  async unPublishPost(postId: string): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
    });

    if (!post) return null;

    await this.postRepo.update(postId, {
      postState: PostStateEnum.UNPUBLISH,
    });

    this.metricService.createPostUnPublishedMetric(
      post.id,
      post.title ?? '',
      post.storeId,
    );
    this.emitEvent(POST_UNPUBLISH_EVENT, post.id);
    return null;
  }

  async deletePost(postId: string): Promise<null> {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) return null;

    this.metricService.createPostDeletedMetric(
      post.id,
      post.title ?? '',
      post.storeId,
    );
    await this.emitEvent(POST_DELETE_EVENT, post.id);
    await this.postRepo.softDelete(post.id);

    return null;
  }

  async createAutomationPost(storeId: string): Promise<Post | null> {
    const post = await this.postRepo.save({
      title: 'Subject...',
      postType: PostTypeEnum.AUTOMATION,
      storeId,
    });
    return post ?? null;
  }

  async checkPostHandleAvailable(
    postId: string,
    handle: string,
  ): Promise<boolean> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
    });

    if (!post) return false;

    if (post.postHandle === handle) return true;

    const checkOtherHandleExist = await this.postRepo.find({
      where: {
        postHandle: handle,
        storeId: post.storeId,
      },
    });

    if (checkOtherHandleExist.length > 0) {
      return false;
    }

    return true;
  }

  async getPostByHandle(postHandle: string): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: {
        postHandle,
      },
    });
    return post ?? null;
  }

  async getMorePosts(postHandle: string): Promise<Post[] | null> {
    const post = await this.postRepo.findOne({
      where: {
        postHandle,
      },
    });

    const morePosts = await this.postRepo
      .createQueryBuilder('post')
      .where('post.storeId =:storeId', { storeId: post?.storeId })
      .andWhere('post.id !=:id', { id: post?.id })
      .andWhere('post.postState =:state', { state: PostStateEnum.PUBLISHED })
      .orderBy('RANDOM()')
      .take(3)
      .getMany();
    return morePosts ?? null;
  }

  async createPostViewed(input: CreatePostViewedInput): Promise<null> {
    const post = await this.getPostByHandle(input.postHandle);

    if (!post) return null;

    if (post.postState === PostStateEnum.DRAFT) return null;
    if (post.postState === PostStateEnum.UNPUBLISH) return null;

    await this.metricService.createPostViewedMetric(
      post?.id,
      post.storeId,
      input.referer,
      input.utmData,
      input.ipAddress,
    );
    return null;
  }

  async getUniquePostViewCount(postId: string): Promise<number> {
    const count = await this.metricService.getPostMetricCountByIpUnique(postId);
    return count;
  }

  async getPostRecipientCount(postId: string): Promise<number> {
    const count = await this.metricService.getEmailSentCountByPostId(postId);
    return count;
  }

  async getPostOpenCount(postId: string): Promise<number> {
    const count = await this.metricService.getEmailOpenedCountByPostId(postId);
    return count;
  }

  async getAllPublishedPostForSiteMap(): Promise<Post[] | null> {
    const posts = await this.postRepo.find({
      where: {
        postType: PostTypeEnum.POST,
        postState: PostStateEnum.PUBLISHED,
      },
      relations: {
        store: true,
      },
    });
    return posts;
  }
  async getPostCount(subdomain: string): Promise<number> {
    const count = await this.postRepo.count({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return count;
  }
}
