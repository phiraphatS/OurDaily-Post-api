import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../_helper/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../_helper/jwt.strategy';
import { UserGuard } from '../../_helper/user.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const _config = {
          secret: config.get<string>('jwt_secret'),
          signOptions: { expiresIn: '7days' },
        }
        return _config;
      },
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    UserGuard,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule { }
