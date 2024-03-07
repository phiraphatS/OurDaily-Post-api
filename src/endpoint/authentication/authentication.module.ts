import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../_helper/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
