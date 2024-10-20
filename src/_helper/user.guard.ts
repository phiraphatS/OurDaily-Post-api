// src/guards/email-user.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../endpoint/authentication/authentication.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const email = request.headers['x-user-email']; // Assuming the email is sent in this header
  
      if (!email) {
        throw new UnauthorizedException('No email provided');
      }
  
      const user = await this.authenticationService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
  
      request.user = user; // Attach the full user object to the request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}