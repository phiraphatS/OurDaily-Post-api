import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from './uploadfile.service';

@Controller('uploadfile')
export class UploadfileController {
  constructor(private readonly uploadfileService: UploadfileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadfileService.uploadFile(file);
  }
}
