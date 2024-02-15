import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './endpoint/feeds/feeds.module';
import { ClientModule } from './socket/client/client.module';
import { UploadfileModule } from './endpoint/uploadfile/uploadfile.module';
import { MulterModule } from '@nestjs/platform-express';
import { IBMModules } from './_helper/imb-cloud.module';
import { PostImg } from './entities/PostImg';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Like } from './entities/Like';
import { Comment } from './entities/Comment';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../typeorm.config'),
      entities: [
        Post, 
        PostImg, 
        User,
        Like,
        Comment,
      ],
    }),
    MulterModule.register({
      dest: './upload',
    }),
    // MinioServiceModule,
    FeedsModule,
    ClientModule,
    UploadfileModule,
    IBMModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
