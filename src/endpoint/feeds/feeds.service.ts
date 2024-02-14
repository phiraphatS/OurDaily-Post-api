import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IBMServices from 'src/_helper/ibm-cloud';
import { Post } from 'src/entities/post.entities';
import { PostImg } from 'src/entities/post_img.entities';
import { User } from 'src/entities/user.entities';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class FeedsService {
  constructor(
    private imbServices: IBMServices,
    private dataSource: DataSource,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImg)
    private postImgRepository: Repository<PostImg>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getFeeds(user: any, page: number, limit: number) {
    try {
      const user = await this.userRepository.find({
        where: {
          id: In([1, 2]),
        }
      })
      const feeds = await this.postRepository.find({
        where: {
          isActive: 1,
          isDeleted: 0,
        },
        relations: {
          postImgs: true,
        },
        order: {
          createdDate: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      })

      const result = [];
      for (const obj of feeds) {
        const imgList = [];
        for (const img of obj.postImgs) {
          imgList.push(img.imgUrl);
        }

        const targetUser = user.find((x) => x.id === obj.createdBy);

        result.push({
          id: obj.id,
          content: obj.contentText,
          img: imgList,
          createdAt: obj.createdDate,
          profile: {
            avatar: targetUser.avatar,
            fullName: targetUser.fullname,
            position: targetUser.roleName,
          }
        });
      }
      
      return {
        status: true,
        message: 'Success',
        results: result,
      };
    } catch (err) {
      throw {
        status: false,
        message: err.message,
        results: err,
      }
    }
  }

  async postNow(user: any, body: any) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newPost = this.postRepository.create();
      newPost.contentText = body.contentText;
      newPost.isActive = 1;
      newPost.isDeleted = 0;
      newPost.createdDate = new Date();
      newPost.modifiedDate = new Date();
      newPost.createdBy = user.id;
      newPost.modifiedBy = user.id;

      await queryRunner.manager.save(newPost);

      const newPostImgList: PostImg[] = [];
      for (const obj of body.imgUrl) {
        const newPostImg = this.postImgRepository.create();
        newPostImg.post = newPost;
        newPostImg.imgUrl = obj.url;
        newPostImg.isActive = 1;
        newPostImg.isDeleted = 0;
        newPostImg.createdDate = new Date();
        newPostImg.modifiedDate = new Date();
        newPostImg.createdBy = user.id;
        newPostImg.modifiedBy = user.id;
        
        newPostImgList.push(newPostImg);
      }

      await queryRunner.manager.save(newPostImgList);
      await queryRunner.commitTransaction();
      return {
        status: true,
        message: 'Success',
        results: null,
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw {
        status: false,
        message: err.message,
        results: err,
      }
    } finally {
      await queryRunner.release();
    }
  }
}
