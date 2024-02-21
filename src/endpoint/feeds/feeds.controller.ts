import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService
  ) {}

  @Post('post-now')
  async postNow(@Req() req: any, @Body() body: any, @Res() res: any) {
    try {
      const user = req.user || { id: 2 };
      const response = await this.feedsService.postNow(user, body);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get('get-feeds')
  async getFeeds(@Req() req: any, @Res() res: any, @Query() query: any){
    try {
      const page = parseInt(query.offset) || 0;
      const limit = parseInt(query.limit) || 10;
      const alreadyGet = query.alreadyGet ? query.alreadyGet.split(',').map((x: string) => parseInt(x)) : [];
      const user = req.user || { id: 2 };
      const response = await this.feedsService.getFeeds(user, page, limit, alreadyGet);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Post('like-post')
  async likePost(@Req() req: any, @Body() body: any, @Res() res: any) {
    try {
      const user = req.user || { id: 2 };
      const response = await this.feedsService.likePost(user, body.post_id);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Post('comment-post')
  async commentPost(@Req() req: any, @Body() body: any, @Res() res: any) {
    try {
      const user = req.user || { id: 2 };
      const response = await this.feedsService.commentPost(user, body);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get('get-comments')
  async getComments(@Req() req: any, @Res() res: any, @Query() query: any){
    try {
      const response = await this.feedsService.getComment(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}
