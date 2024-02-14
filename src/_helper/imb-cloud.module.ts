import { Module } from '@nestjs/common';
import IBMServices from 'src/_helper/ibm-cloud';

@Module({
  providers: [
    IBMServices,
  ],
  exports: [
    IBMServices,
  ],
})
export class IBMModules {}
