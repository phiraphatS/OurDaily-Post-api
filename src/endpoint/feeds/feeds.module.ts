import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/Post';
import { PostImg } from '../../entities/PostImg';
import { User } from '../../entities/User';
import { Like } from '../../entities/Like';
import { Comment } from '../../entities/Comment';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostImg,
      User,
      Like,
      Comment,
    ]),
  ],
  controllers: [FeedsController],
  providers: [
    FeedsService,
  ],
})
export class FeedsModule {}
