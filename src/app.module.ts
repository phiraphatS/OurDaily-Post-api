import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './endpoint/feeds/feeds.module';
import { ClientModule } from './socket/client/client.module';
import { PostImg } from './entities/post_img.entities';
import { Post } from './entities/post.entities';
import { UploadfileModule } from './endpoint/uploadfile/uploadfile.module';
import { MulterModule } from '@nestjs/platform-express';
import { User } from './entities/user.entities';
import IBMServices from './_helper/ibm-cloud';
import { IBMModules } from './_helper/imb-cloud.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../typeorm.config'),
      entities: [
        Post,
        PostImg,
        User,
      ]
    }),
    MulterModule.register({
      dest: './upload',
    }),
    FeedsModule,
    ClientModule,
    UploadfileModule,
    IBMModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IBMServices
  ],
})
export class AppModule {}
