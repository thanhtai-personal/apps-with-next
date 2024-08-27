import { CatchExceptions } from '@/decorators';
import { AuthGuard } from '@/guards/auth.guard';
import { AuthService } from '@/services/auth/auth.service';
import { ITelegramInfo } from '@core-ui/goat-tap-types';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
@CatchExceptions()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getAuth(
    @Req() req: Request & { authUser: any },
    @Res() res: Response,
  ) {
    try {
      const authUser = req.authUser;
      if (!authUser) {
        return res.status(HttpStatus.UNAUTHORIZED).send("No authorization");
      }
      const authData = await this.authService.getUser(authUser.user?.id)
      return res.status(HttpStatus.OK).send(authData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('login')
  async signIn(
    @Query('telegramId') telegramId: string,
    @Query('referralParams') referralParams: string,
    @Res() res: Response
  ) {
    try {
      const authData = await this.authService.signIn(telegramId, referralParams);
      if (authData.error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: authData.error.message,
          code: authData.error.code,
          status: authData.error.status
        });
      }
      return res.status(HttpStatus.OK).send(authData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get()
  async authenticate(
    @Query()
    query: any,
    @Res()
    res: Response
  ) {
    try {
      if (!this.authService.validateTelegramData(query)) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authentication failed');
      }

      const telegramInfo: ITelegramInfo = {
        telegramId: query.id,
        first_name: query.first_name,
        last_name: query.last_name,
        username: query.username,
        photo_url: query.photo_url,
        auth_date: query.auth_date,
      };

      // Optionally fetch additional user info
      const userInfo = await this.authService.signIn(telegramInfo.telegramId);
      if (userInfo.error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(userInfo.error);
      }
      return res.status(HttpStatus.OK).send(userInfo);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('profile')
  getProfile(
    @Body()
    req: any,
    @Res()
    res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send(req.user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}