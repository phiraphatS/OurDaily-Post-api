import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.enableCors();
  const port = process.env.PORT || 5001;
  await app.listen(port);
  console.log(`Platform                   : ${process.platform}`);
  console.log(`Server started on port     : ${port}`);
  console.log(`API URL                    : http://localhost:${port}/api`);
  console.log(`Server running on hostname : ${os.hostname()}`);
  console.log(`Node Env                   : ${process.env.NODE_ENV}`);
  console.log(`AWS Region                 : ${process.env.AWS_REGION}`);
  console.log(`AWS Bucket                 : ${process.env.AWS_BUCKET}`);
}
bootstrap();
