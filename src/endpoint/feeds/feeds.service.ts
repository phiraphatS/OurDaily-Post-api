import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entities';
import { PostImg } from 'src/entities/post_img.entities';
import { Repository } from 'typeorm';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImg)
    private postImgRepository: Repository<PostImg>,
  ) {}

  async getFeeds() {
    try {
      const feeds = await this.postRepository.find({
        where: {
          isActive: 1,
          isDeleted: 0,
        },
        relations: ['postImg'],
      });
      return {
        status: true,
        message: 'Success',
        results: feeds,
      };
    } catch (err) {
      return {
        status: false,
        message: err.message,
        results: err,
      }
    }
  }
}
