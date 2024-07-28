import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from '../../_helper/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return await this.authenticationService.login(req.user);
  }

  @Post('regenerate-password')
  async regeneratePasswordAndUpdate() {
    return await this.authenticationService.regeneratePasswordAndUpdate();
  }
}
