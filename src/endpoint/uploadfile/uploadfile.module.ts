import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';
import IBMServices from 'src/_helper/ibm-cloud';

@Module({
  controllers: [UploadfileController],
  providers: [
    UploadfileService,
    IBMServices,
  ],
})
export class UploadfileModule {}
