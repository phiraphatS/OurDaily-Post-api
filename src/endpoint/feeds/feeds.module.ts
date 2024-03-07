import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/Post';
import { PostImg } from '../../entities/PostImg';
import { User } from '../../entities/User';
import { Like } from '../../entities/Like';
import { Comment } from '../../entities/Comment';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostImg,
      User,
      Like,
      Comment,
    ]),
    UsersModule,
  ],
  controllers: [FeedsController],
  providers: [
    FeedsService,
    S3StorageCloud,
    UsersService,
  ],
})
export class FeedsModule {}
