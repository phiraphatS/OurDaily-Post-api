import { Controller, Post, Body, UseGuards, Req, Res, HttpStatus, Query, Get } from '@nestjs/common';
import { GooglePictureService } from './google-picture.service';
import { UserGuard } from '../../_helper/user.guard';
import { User } from '../../_decorators/user.decorator';
import { User as UserEntity } from '../../entities/User';

@Controller('google-picture')
@UseGuards(UserGuard)
export class GooglePictureController {
  constructor(private readonly googlePictureService: GooglePictureService) {}

  @Post('create-or-get-album')
  async createOrGetAlbum(@Body() body: { albumName: string }, @User() user: UserEntity, @Res() res: any) {
    try {
      const response = await this.googlePictureService.createOrGetAlbum(body.albumName, user.id);
      res.status(HttpStatus.OK).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Post('update-shared-album')
  async updateSharedAlbum(@Body() sharedAlbumData: any, @User() user: UserEntity, @Res() res: any) {
    try {
      const response = await this.googlePictureService.updateSharedAlbum(sharedAlbumData);
      res.status(HttpStatus.OK).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Post('add-user-to-album')
  async addUserToAlbum(@Body() body: { albumId: number, role: string }, @User() user: UserEntity, @Res() res: any) {
    try {
      const response = await this.googlePictureService.addUserToAlbum(user.id, body.albumId, body.role);
      res.status(HttpStatus.OK).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get('check-is-user-in-album')
  async checkIsUserInAlbum(@Query('title') title: string, @User() user: UserEntity, @Res() res: any) {
    try {
      const response = await this.googlePictureService.checkIsUserInAlbum(user.id, title);
      res.status(HttpStatus.OK).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}