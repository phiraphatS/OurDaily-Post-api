import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-variable')
  checkVariable() {
    return this.appService.checkVariable();
  }
  // @Get('buckets')
  // listAllBuckets() {
  //   return this.appService.listAllBuckets();
  // }
}
