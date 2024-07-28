import * as os from 'os';;
import * as winston from 'winston';
import * as cookieParser from 'cookie-parser'
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './log.interceptors';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: WinstonModule.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          zippedArchive: true, // Enable compression
          maxSize: '20m', // Max size of the log file
          maxFiles: '14d', // Keep logs for 14 days
        }),
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    })
  });

  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'our-diary-phiraphat.zeabur.com'],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-recaptcha-token', 'multipart/form-data'],
  //   credentials: true,
  // });
  app.enableCors();

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const port = process.env.PORT || 5001;
  await app.listen(port);
  
  console.log(`Server started on port     : ${port}`);
  console.log(`Platform                   : ${process.platform}`);
  console.log(`App Version                : ${process.env.npm_package_version}`);
  console.log(`Server running on hostname : ${os.hostname()}`);
  console.log(`Start Time                 : ${new Date().toLocaleString()}`);
  console.log(`API URL                    : http://localhost:${port}/api`);
  // console.log(`AWS Region                 : ${process.env.AWS_REGION}`);
  // console.log(`AWS Bucket                 : ${process.env.AWS_BUCKET}`);
}
bootstrap();
