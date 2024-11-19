import { AuthService } from '@/services/auth/auth.service';
import { Response, Request } from 'express';
import { NEST_COMMON } from "@core-api/nest-core";
import { CatchExceptions } from "@/decorators";
import Cookies from 'universal-cookie';
import { AuthGuard } from "@/guards/auth.guard";

const {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} = NEST_COMMON

@Controller('auth')
@CatchExceptions()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  @NEST_COMMON.UseGuards(AuthGuard)
  async getAuth(
    @Req() req: Request & { authUser: any },
    @Res() res: Response,
  ) {
    try {
      const token = req.headers["authorization"] || ""
      const cookies = new Cookies(req.headers.cookie, { path: '/' });
      const refreshToken = cookies.get('refreshToken')
      const authData = await this.authService.getAuthentication(token, refreshToken)
      return res.status(HttpStatus.OK).send(authData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('refresh-token')
  @NEST_COMMON.UseGuards(AuthGuard)
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const cookies = new Cookies(req.headers.cookie, { path: '/' });
      const refreshToken = cookies.get('refreshToken')
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }
      const data = await this.authService.refreshToken(refreshToken);
      return res.status(HttpStatus.OK).send(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('login')
  async signIn(
    @Body()
    body: any,
    @Res() res: Response
  ) {
    try {
      const data = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('logout')
  async signOut(
    @Res() res: Response
  ) {
    try {
      // const data = await this.authService.signOut();
      return res.status(HttpStatus.OK).send(true);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('register')
  async register(
    @Body()
    body: any,
    @Res() res: Response
  ) {
    try {
      await this.authService.register(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    body: any,
    @Res() res: Response
  ) {
    try {
      const data = await this.authService.resetPassword(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}