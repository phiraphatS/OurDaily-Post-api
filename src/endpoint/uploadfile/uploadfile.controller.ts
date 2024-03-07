import { Controller, Delete, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from './uploadfile.service';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';

@Controller('uploadfile')
export class UploadfileController {
  constructor(
    private readonly uploadfileService: UploadfileService,
    private readonly s3StorageCloud: S3StorageCloud
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadfileService.uploadFile(file);
  }

  @Post('upload-s3')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileS3(@UploadedFile() file: Express.Multer.File, @Res() res: any) {
    try {
      const dateIso = new Date().toISOString();
      const newKey = `our-diary-${dateIso}.${file.originalname.split('.').pop()}`;
  
      await this.s3StorageCloud.uploadFile(newKey, file.buffer);
      const presignedUrl = await this.s3StorageCloud.getSignedUrl(newKey);
      const result = {
        key: newKey,
        url: presignedUrl,
        originalname: file.originalname,
      }
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Success',
        results: result,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        results: err,
      });
    }
  }

  @Delete('delete-s3')
  async deleteFileS3(@Res() res: any, @Query('key') key: string){
    try {
      const results = await this.s3StorageCloud.deleteFile(key);
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Success',
        results: results,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        results: err,
      });
    }
  }
}
