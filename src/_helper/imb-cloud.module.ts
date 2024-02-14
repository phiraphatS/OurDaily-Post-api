import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImg } from 'src/entities/post_img.entities';
import { Post } from 'src/entities/post.entities';
import IBMServices from 'src/_helper/ibm-cloud';
import { User } from 'src/entities/user.entities';

@Module({
  providers: [
    IBMServices,
  ],
  exports: [
    IBMServices,
  ],
})
export class IBMModules {}
