import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';
import IBMServices from '../../_helper/ibm-cloud';
import { S3StorageCloud } from '../../_helper/s3-storage-cloud';

@Module({
  imports: [],
  controllers: [UploadfileController],
  providers: [
    UploadfileService,
    IBMServices,
    // S3StorageCloud,
  ],
})
export class UploadfileModule {}
