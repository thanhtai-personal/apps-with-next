import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth/auth.service';
import { EnvironmentConfig, JwtConfig } from '@/config';
import { NEST_COMMON, NEST_JWT, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { TypeOrmModule } from "@core-api/nest-typeorm-postgres";
import { UserEntity } from "@/entities";
import { CryptoModule } from "@/modules/encrypt/encrypt.module";
import { AuthMessages, UMS_SERVICE } from "@core-api/microservices-utils"

const { Module } = NEST_COMMON
const { JwtModule } = NEST_JWT

@Module({
  imports: [
    NEST_MICRO_SERVICE.ClientsModule.register([
      {
        name: UMS_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
          retryAttempts: 3,
          retryDelay: 1000,
          wildcards: false,
        }
      },
    ]),
    JwtModule.register({
      global: true,
      secret: JwtConfig.JWT_SECRET,
      signOptions: { expiresIn: JwtConfig.JWT_EXPIRATION },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthMessages.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  exports: [AuthService]
})

export class AuthModule {
  // Add Redis message pattern handling here if needed
}
