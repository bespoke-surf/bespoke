import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostList } from './post-list.entity';

@Injectable()
export class PostListService {
  constructor(
    @InjectRepository(PostList)
    private postListRepo: Repository<PostList>,
  ) {}

  async createPostList(postId: string, listId: string): Promise<PostList> {
    const postList = await this.postListRepo.save({
      listId,
      postId,
    });
    return postList ?? null;
  }
}
