import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';
import { IBMModules } from '../../_helper/imb-cloud.module';

@Module({
  imports: [
    IBMModules,
  ],
  controllers: [UploadfileController],
  providers: [
    UploadfileService,
  ],
})
export class UploadfileModule {}
