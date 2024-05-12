import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './src/_multer/uploads',
                    filename: (req, file, cb) => {
                        const fileName = `${Date.now()}-${file.originalname}`;
                        return cb(null, fileName);
                    },
                }),
            }),
        }),
    ],
})
export class ProjectMulterModule { }
