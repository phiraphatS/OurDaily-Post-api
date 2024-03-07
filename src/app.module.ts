import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './endpoint/feeds/feeds.module';
import { ClientModule } from './socket/client/client.module';
import { UploadfileModule } from './endpoint/uploadfile/uploadfile.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostImg } from './entities/PostImg';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Like } from './entities/Like';
import { Comment } from './entities/Comment';
import { UsersModule } from './endpoint/users/users.module';
import { AuthenticationModule } from './endpoint/authentication/authentication.module';
import IBMServices from './_helper/ibm-cloud';
import { ConfigModule } from '@nestjs/config';
import configuration from './_configuration/configuration';


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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.development', '.env.production', '.env.staging', '.env.test', '.env.local'],
    }),
    FeedsModule,
    ClientModule,
    UploadfileModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IBMServices,
  ],
})
export class AppModule {}
