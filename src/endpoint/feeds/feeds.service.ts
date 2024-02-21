import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Not, Repository } from 'typeorm';
import { Post } from '../../entities/Post';
import { Like } from '../../entities/Like';
import { PostImg } from '../../entities/PostImg';
import { User } from '../../entities/User';
import { Comment } from '../../entities/Comment';

@Injectable()
export class FeedsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImg)
    private postImgRepository: Repository<PostImg>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async getFeeds(user: any, offset: number, limit: number, alreadyGet: number[]) {
    try {
      const user = await this.userRepository.find({
        select: {
          id: true,
          avatar: true,
          fullName: true,
          rolename: true,
        },
        where: {
          id: In([1, 2]),
        },
        relations: {
          likes: true,
          comments: true,
        }
      })

      const feeds = await this.postRepository.find({
        where: {
          id: Not(In(alreadyGet)),
          isActive: 1,
          isDeleted: 0,
        },
        relations: {
          postImgs: true,
          likes: {
            user: true,
          },
          comments: {
            user: true,
          }
        },
        order: {
          createdDate: 'DESC',
        },
        skip: offset,
        take: limit,
      })

      const result = [];
      for (const obj of feeds) {
        const imgList = [];
        for (const img of obj.postImgs) {
          imgList.push(img.imgUrl);
        }

        const targetUser = user.find((x) => x.id === obj.createdBy);
        const isLiked = obj.likes.find((x) => x.user.id === targetUser.id) ? true : false;
        
        const likedUser = user.filter((x) => obj.likes.find((y) => y.user.id === x.id));
        const commentUser = user.filter((x) => obj.comments.find((y) => y.user.id === x.id));

        const mapLikedUser = likedUser.map((x) => ({
          id: x.id,
          avatar: x.avatar,
          fullName: x.fullName,
          position: x.rolename,
        }))

        const mapCommentUser = commentUser.map((x) => ({
          id: x.id,
          avatar: x.avatar,
          fullName: x.fullName,
          position: x.rolename,
        }))

        const filterComment = obj.comments.filter((x) => x.isActive && !x.isDeleted);
        result.push({
          id: obj.id,
          content: obj.contentText,
          img: imgList,
          createdAt: obj.createdDate,
          profile: {
            id: targetUser.id,
            avatar: targetUser.avatar,
            fullName: targetUser.fullName,
            position: targetUser.rolename,
          },
          action: {
            like: mapLikedUser,
            comment: mapCommentUser,
            commentCount: filterComment.length,
          },
          isLiked: isLiked,
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

  async likePost(user: any, postId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let isLike = false;
      const post = await this.postRepository.findOne({
        where: {
          id: postId,
          isActive: 1,
          isDeleted: 0,
        },
        relations: {
          likes: {
            user: true,
          },
        }
      });
      const getUser = await this.userRepository.findOneBy({ id: user.id });

      if (!post) {
        throw {
          status: false,
          message: 'Post not found',
          results: null,
        }
      }

      let like = post.likes.find((x) => x.user && (x.user.id === user.id));
      if (like) {
        like.isActive = like.isActive? 0 : 1;
        like.modifiedAt = new Date();

        await queryRunner.manager.save(like);
        isLike = like.isActive? true : false;
      } else {
        like = this.likeRepository.create();
        like.post = post;
        like.user = getUser;
        like.isActive = 1;
        like.isDeleted = 0;
        like.createdAt = new Date();
        like.modifiedAt = new Date();

        await queryRunner.manager.save(like);
        isLike = true;
      }

      const userMap = {
        id: like.user.id,
        avatar: like.user.avatar,
        fullName: like.user.fullName,
      };

      const results = {
        isLike: isLike,
        user: userMap,
      }

      await queryRunner.commitTransaction();
      return {
        status: true,
        message: 'Success',
        results: results,
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

  async commentPost(user: any, body: any) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const post = await this.postRepository.findOne({
        where: {
          id: body.postId,
          isActive: 1,
          isDeleted: 0,
        },
        relations: {
          comments: {
            user: true,
          },
        }
      });
      const getUser = await this.userRepository.findOneBy({ id: user.id });

      if (!post) {
        throw {
          status: false,
          message: 'Post not found',
          results: null,
        }
      }

      const newComment = this.commentRepository.create();
      newComment.post = post;
      newComment.user = getUser;
      newComment.content = body.content;
      newComment.isActive = 1;
      newComment.isDeleted = 0;
      newComment.createdAt = new Date();
      newComment.modifiedAt = new Date();

      await queryRunner.manager.save(newComment);

      const userMap = {
        id: newComment.user.id,
        avatar: newComment.user.avatar,
        fullName: newComment.user.fullName,
      };

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

  async getComment({ postId }: { postId: number}) {
    try {
      const getPost = await this.postRepository.findOne({
        where: {
          id: postId,
          isActive: 1,
          isDeleted: 0,
        },
        relations: {
          comments: {
            user: true,
          },
        }
      });

      if (!getPost) {
        throw {
          status: false,
          message: 'Post not found',
          results: null,
        }
      }

      const filterComments = getPost.comments.filter((x) => x.isActive && !x.isDeleted);
      const sortComments = filterComments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      // const comments = await this.commentRepository.find({
      //   where: {
      //     post: getPost,
      //     isActive: 1,
      //     isDeleted: 0,
      //   },
      //   relations: {
      //     user: true,
      //   },
      //   order: {
      //     createdAt: 'DESC',
      //   }
      // });

      const user = await this.userRepository.find({
        select: {
          id: true,
          avatar: true,
          fullName: true,
          rolename: true,
        },
        where: {
          id: In([1, 2]),
        },
        relations: {
          likes: true,
          comments: true,
        }
      })

      const result = [];
      for (const obj of sortComments) {
        const targetUser = user.find((x) => x.id === obj.user.id);
        result.push({
          id: obj.id,
          content: obj.content,
          createdAt: obj.createdAt,
          profile: {
            avatar: targetUser.avatar,
            fullName: targetUser.fullName,
            position: targetUser.rolename,
          },
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

  async deletePost(user: any, postId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const post = await this.postRepository.findOne({
        where: {
          id: postId,
          isActive: 1,
          isDeleted: 0,
          createdBy: user.id,
        },
      });

      if (!post) {
        throw {
          status: false,
          message: 'Post not found',
          results: null,
        }
      }

      post.isActive = 0;
      post.isDeleted = 1;
      post.modifiedDate = new Date();
      post.modifiedBy = user.id;

      await queryRunner.manager.save(post);
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
