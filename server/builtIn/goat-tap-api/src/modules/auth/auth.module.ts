import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth/auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@/config';
import { BoostModule } from '../boost/boost.module';
import { CryptoModule } from "../encrypt/encrypt.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConfig.JWT_SECRET,
      signOptions: { expiresIn: JwtConfig.JWT_EXPIRATION },
    }),
    UsersModule,
    BoostModule,
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule { }
