import { Injectable } from '@nestjs/common';
// import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class AppService {
  constructor(
    // private readonly minioService: MinioService
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // listAllBuckets() {
  //   return this.minioService.client.listBuckets();
  // }
}
