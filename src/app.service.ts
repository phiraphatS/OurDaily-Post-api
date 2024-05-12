import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class AppService {
  private region: string;
  private bucket: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  constructor(
    private configService: ConfigService
  ) {
    // this.region = this.configService.get<string>('AWS_REGION');
    // this.bucket = this.configService.get<string>('AWS_BUCKET');
    // this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    // this.secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }
  getHello(): string {
    return 'Hello World!';
  }

  checkVariable() {
    const result = {
      region: this.region,
      bucket: this.bucket,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    }

    return result;
  }

  checkDateTimeOnEnvirontment() {
    const currentDateTime = new Date();
    const isoDateFormat = currentDateTime.toISOString();
    const dateTimeFormat = currentDateTime.toLocaleString();
    const fixLocaleDateTime = currentDateTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

    return {
      isoDateFormat,
      dateTimeFormat,
      fixLocaleDateTime
    }
  }
  // listAllBuckets() {
  //   return this.minioService.client.listBuckets();
  // }
}
