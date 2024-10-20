import { Module } from '@nestjs/common';
import { GooglePictureService } from './google-picture.service';
import { GooglePictureController } from './google-picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedAlbums } from '../../entities/SharedAlbums';
import { UserAlbums } from '../../entities/UserAlbums';
import { User } from '../../entities/User';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserGuard } from '../../_helper/user.guard';

@Module({
  imports: [
    AuthenticationModule,
    TypeOrmModule.forFeature([
      SharedAlbums,
      UserAlbums,
      User,
    ]),
  ],
  controllers: [GooglePictureController],
  providers: [
    GooglePictureService, 
    UserGuard
  ],
})
export class GooglePictureModule {}
