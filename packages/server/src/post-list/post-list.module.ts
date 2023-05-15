import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostList } from './post-list.entity';
import { PostListService } from './post-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostList])],
  providers: [PostListService],
  exports: [PostListService],
})
export class PostListModule {}
