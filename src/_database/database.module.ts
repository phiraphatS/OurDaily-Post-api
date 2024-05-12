import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostImg } from '../entities/PostImg';
import { User } from '../entities/User';
import { Comment } from '../entities/Comment';
import { FileUpload } from '../entities/FileUpload';
import { Post } from '../entities/Post';
import { Like } from '../entities/Like';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            // imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const _conn = {
                    type: configService.get('database.type') as any,
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    entities: configService.get('database.entities'),
                    synchronize: configService.get('database.synchronize') === 'true',
                    logging: configService.get('database.logging') === 'true',
                    retryAttempts: 1,
                };
                return _conn;
            },
        }),
    ],
})
export class DatebaseModule { }
