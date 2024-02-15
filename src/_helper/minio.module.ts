import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';

// Console: http://172.31.137.226:9090 http://127.0.0.1:9090   

// S3-API: http://172.31.137.226:9000  http://127.0.0.1:9000     

// Status:         1 Online, 0 Offline. 
@Module({
    imports: [
        MinioModule.register({
            endPoint: '172.31.137.226',
            port: 9000,
            useSSL: false,
            accessKey: 'minio',
            secretKey: 'tVgmNQc5CD7649q1z0IU8FGwrYLWs3H2'
        })
    ],
    exports: [MinioModule]
})

export class MinioServiceModule {}