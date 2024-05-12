import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './endpoint/feeds/feeds.module';
import { ClientModule } from './socket/client/client.module';
import { UploadfileModule } from './endpoint/uploadfile/uploadfile.module';
import { UsersModule } from './endpoint/users/users.module';
import { AuthenticationModule } from './endpoint/authentication/authentication.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './_configuration/configuration.module';
import { ProjectMulterModule } from './_multer/_multer.module';
import { DatebaseModule } from './_database/database.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   ...require('../typeorm.config'),
    //   entities: [
    //     Post, 
    //     PostImg, 
    //     User,
    //     Like,
    //     Comment,
    //   ],
    // }),
    DatebaseModule,
    ConfigurationModule,
    // FeedsModule,
    ClientModule,
    UploadfileModule,
    // UsersModule,
    // AuthenticationModule,
    ProjectMulterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // IBMServices,
    ConfigService,
  ],
})
export class AppModule {}
