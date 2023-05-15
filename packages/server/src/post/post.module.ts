import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { MetricModule } from '../metric/metirc.module';
import { PostListModule } from '../post-list/post-list.module';
import { Post } from './post.entity';
import { PostListener } from './post.listner';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    EventModule,
    PostListModule,
    MetricModule,
  ],
  providers: [PostService, PostResolver, PostListener],
  exports: [PostService],
})
export class PostModule {}
