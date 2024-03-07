import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';
import { Like } from '../../entities/Like';
import { Comment } from '../../entities/Comment';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Like,
      Comment,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    S3StorageCloud,
  ],
})
export class UsersModule {}
