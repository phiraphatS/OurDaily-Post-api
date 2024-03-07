import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { DataSource, Repository } from 'typeorm';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';

@Injectable()
export class UsersService {
    constructor(
        private s3Storage: S3StorageCloud,
        private dataSource: DataSource,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getUserAll() {
        const queryRunner = this.dataSource.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.usersRepository.find({
                select: {
                    id: true,
                    avatar: true,
                    avatarKey: true,
                    avatarExpiredDate: true,
                    fullName: true,
                    rolename: true,
                },
                relations: {
                    likes: true,
                    comments: true,
                }
            });
    
            const reCheckAndUpdateAvatar = await Promise.all(user.map(async (x) => {
                if (!x.avatarExpiredDate || x.avatarExpiredDate < new Date()) {
                    const newUrl = await this.s3Storage.getSignedUrl(x.avatarKey);
                    if (!newUrl) {
                        return x;
                    }

                    const date = new Date();
                    date.setHours(date.getHours() + 1);

                    x.avatar = newUrl;
                    x.avatarExpiredDate = date;
                }

                return x;
            }));

            await queryRunner.manager.save(reCheckAndUpdateAvatar);
            await queryRunner.commitTransaction();

            return reCheckAndUpdateAvatar
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err
        }
    }
}
