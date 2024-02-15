import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImg } from 'src/entities/PostImg';
import { Post } from 'src/entities/Post';
import { User } from 'src/entities/User';
import { Like } from 'src/entities/Like';
import { Comment } from 'src/entities/Comment';

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
