import { Controller, Delete, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from './uploadfile.service';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';

@Controller('uploadfile')
export class UploadfileController {
  constructor(
    private readonly uploadfileService: UploadfileService,
    // private readonly s3StorageCloud: S3StorageCloud
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadfileService.uploadFile(file);
  }
}
