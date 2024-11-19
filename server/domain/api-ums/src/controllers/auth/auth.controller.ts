import { AuthGuard } from '@/guards/auth.guard';
import { AuthService } from '@/services/auth/auth.service';
import { Response, Request } from 'express';
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { CatchExceptions } from "@/decorators";
import { UserCreationDto } from "@/dtos";
import { AuthMessages } from "@core-api/microservices-utils";


const {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} = NEST_COMMON

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
      const token = req.headers["Authorization"]?.[0] || "";
      if (!token) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "no token" });
      }
      const authData = await this.authService.getAuthentication(token)
      return res.status(HttpStatus.OK).send(authData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.GET_AUTH })
  async handleAuthMessage(@NEST_MICRO_SERVICE.Payload() data: { token: string, refreshToken?: string }, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    try {
      const result = await this.authService.getAuthentication(data.token, data.refreshToken);
      return result;
    } catch (error) {
      console.error('Error processing auth message', error);
      throw error; // Or handle the error appropriately
    }
  }
  

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw res.status(HttpStatus.BAD_REQUEST).send({ message: 'Refresh token not found' });
      }
      const newToken = await this.authService.refreshToken(refreshToken);
      return res.status(HttpStatus.OK).send(newToken);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.REFRESH_TOKEN })
  async handleRefreshTokenMessage(@NEST_MICRO_SERVICE.Payload() req: { refreshToken: string }, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const newToken = await this.authService.refreshToken(req.refreshToken);
      return newToken;
    } catch (error) {
      throw error;
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.SIGN_IN })
  async handleSignInMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const result = await this.authService.login(data);
      return result;
    } catch (error) {
      console.error('Error processing login message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post('register')
  async register(
    @Body()
    body: UserCreationDto,
    @Res() res: Response
  ) {
    try {
      await this.authService.register(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.REGISTER })
  async handleRegisterMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const result = await this.authService.register(data);
      return result;
    } catch (error) {
      console.error('Error processing register message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post('reset-password')
  async resetPassword(
    // @Body()
    // body: ResetPasswordDto,
    @Res() res: Response
  ) {
    try {
      // await this.authService.resetPassword(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.RESET_PASSWORD })
  async handleResetPasswordMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      // await this.authService.resetPassword(data);
      return true;
    } catch (error) {
      console.error('Error processing reset password message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthMessages.VALIDATE_TOKEN })
  async provideAuthenID(@NEST_MICRO_SERVICE.Payload() data: { token: string, refreshToken?: string }, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    try {
      const result = await this.authService.getAuthentication(data.token, data.refreshToken);
      return result;
    } catch (error) {
      console.error('Error processing auth message', error);
      throw error; // Or handle the error appropriately
    }
  }
}