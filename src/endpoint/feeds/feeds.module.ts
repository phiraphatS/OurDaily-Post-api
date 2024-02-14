import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImg } from 'src/entities/post_img.entities';
import { Post } from 'src/entities/post.entities';
import { User } from 'src/entities/user.entities';

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
