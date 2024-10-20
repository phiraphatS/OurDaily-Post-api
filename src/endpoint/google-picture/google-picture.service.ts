import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SharedAlbums } from '../../entities/SharedAlbums';
import { UserAlbums } from '../../entities/UserAlbums';
import { User } from '../../entities/User';

@Injectable()
export class GooglePictureService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(SharedAlbums)
        private sharedAlbumsRepository: Repository<SharedAlbums>,
        @InjectRepository(UserAlbums)
        private userAlbumsRepository: Repository<UserAlbums>,
    ) { }

    async createOrGetAlbum(albumName: string, userId: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let album = await this.sharedAlbumsRepository.findOne({ where: { title: albumName } });
            const isHasAlbum = !!album;

            if (!album) {
                const user = await this.userRepository.findOne({ where: { id: userId } });
                album = this.sharedAlbumsRepository.create({
                    title: albumName,
                    createdBy: user,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    googleAlbumId: 'placeholder', // You'll need to update this with the actual Google Album ID
                    shareToken: 'placeholder',
                    shareableUrl: 'placeholder',
                });
                await this.sharedAlbumsRepository.save(album);
            }

            await queryRunner.commitTransaction();
            return {
                status: true,
                message: 'Successfully',
                results: {
                    album,
                    isHasAlbum,
                },
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw {
                status: false,
                message: 'Failed',
                error,
            }
        } finally {
            await queryRunner.release();
        }
    }

    async updateSharedAlbum(body: any) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            
            const album = await this.sharedAlbumsRepository.findOne({ where: { id: body.id } });
            if (!album) {
                throw new Error('Album not found');
            }

            album.googleAlbumId = body.googleAlbumId;
            album.shareToken = body.shareToken;
            album.shareableUrl = body.shareableUrl;
            album.updatedAt = new Date();
            const results = this.sharedAlbumsRepository.save(album);

            await queryRunner.commitTransaction();
            return {
                status: true,
                message: 'Successfully',
                results: results,
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw {
                status: false,
                message: 'Failed',
                error,
            }
        } finally {
            await queryRunner.release();
        }
    }

    async addUserToAlbum(userId: number, albumId: number, role: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
        
            let userAlbum = await this.userAlbumsRepository.findOne({
                where: { userId, albumId },
            });
    
            if (!userAlbum) {
                userAlbum = this.userAlbumsRepository.create({
                    userId,
                    albumId,
                    role,
                });
            } else {
                userAlbum.role = role;
            }
    
            const results = this.userAlbumsRepository.save(userAlbum);
            await queryRunner.commitTransaction();
            return {
                status: true,
                message: 'Successfully',
                results: results,
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw {
                status: false,
                message: 'Failed',
                error,
            }
        } finally {
            await queryRunner.release();
        }
    }

    async checkIsUserInAlbum(userId: number, title: string) {
        try {
            const album = await this.sharedAlbumsRepository.findOne({ where: { title } });
            if (!album) {
                return {
                    status: false,
                    message: 'Album not found',
                }
            }

            const userAlbum = await this.userAlbumsRepository.findOne({
                where: { 
                    userId, 
                    album: {
                        id: album.id,
                    }
                },
            });

            return {
                status: true,
                message: 'Successfully',
                results: {
                    isJoined: !!userAlbum,
                    albumId: album.id,
                    shareToken: album.shareToken,
                },
            }
        } catch (error) {
            throw {
                status: false,
                message: 'Failed',
                error,
            }
        }
    }
}