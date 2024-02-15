import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImg } from 'src/entities/PostImg';
import { Post } from 'src/entities/Post';
import { User } from 'src/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostImg,
      User,
    ]),
  ],
  controllers: [FeedsController],
  providers: [
    FeedsService,
  ],
})
export class FeedsModule {}
