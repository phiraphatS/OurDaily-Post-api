import { Module } from '@nestjs/common';
import IBMServices from './ibm-cloud';

@Module({
  providers: [
    IBMServices,
  ],
  exports: [
    IBMServices,
  ],
})
export class IBMModules {}
