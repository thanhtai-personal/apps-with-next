import { InjectRepository, Repository } from "@core-api/nest-typeorm-postgres";
import { NEST_COMMON, NEST_JWT } from "@core-api/nest-core";
import { UserEntity } from "@/entities";
import { UserCreationDto } from "@/dtos/userCreation.dto";
import * as bcrypt from 'bcrypt';
import { EncryptConfig, JwtConfig } from "@/config";

const { Injectable } = NEST_COMMON

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: NEST_JWT.JwtService,
  ) {

  }

  async register(data: UserCreationDto): Promise<UserEntity | undefined> {
    if (!data.email || !data.password) throw new NEST_COMMON.NotFoundException();;
    const user = await this.usersRepository.findOne({ where: { email: data.email } });

    if (user) {
      throw new NEST_COMMON.BadRequestException('User already registered');
    }

    const newUser = this.usersRepository.create(data);
    const salt = await bcrypt.genSalt(EncryptConfig.saltOrRounds ? Number(EncryptConfig.saltOrRounds) : 10);
    const hash = await bcrypt.hash(data.password, salt);
    newUser.password = hash;
    newUser.salt = salt;

    return await this.usersRepository.save(newUser);
  }

  async login({ email, password }: any): Promise<{ access_token: string, refreshToken: string, user: UserEntity }> {
    const user = await this.usersRepository.findOne({ where: { email: email }, relations: ["roleData", "roleData.permissions"] });

    if (!user || !(await this.validatePassword(password, user))) {
      throw new NEST_COMMON.UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({ user }, {
        secret: JwtConfig.JWT_SECRET,
        expiresIn: JwtConfig.TOKEN_ALIVE_TIME
      }),
      refreshToken: this.jwtService.sign({ user }, {
        secret: JwtConfig.JWT_SECRET,
        expiresIn: JwtConfig.REFRESH_TOKEN_ALIVE_TIME
      }),
      user
    }
  }

  async getAuthentication(accessToken: string, refreshToken?: string): Promise<{ user: any, accessToken: string } | null> {
    try {
      // Try verifying the access token
      const payload = await this.jwtService.verifyAsync(this.extractToken(accessToken) || ""
        , { secret: JwtConfig.JWT_SECRET });
      // If verification succeeds, return the user and new access token (optional)
      const newToken = await this.jwtService.signAsync({
        user: payload.user,
      }, {
        secret: JwtConfig.JWT_SECRET,
        expiresIn: JwtConfig.TOKEN_ALIVE_TIME
      });
      return {
        user: payload.user,
        accessToken: newToken,
      };

    } catch (error: any) {
      if (refreshToken) {
        try {
          return await this.refreshToken(refreshToken);
        } catch (error) {
          throw new NEST_COMMON.UnauthorizedException('Invalid or expired refresh token');
        }
      } else {
        console.log("error", error)
        throw new NEST_COMMON.UnauthorizedException('Invalid access token');
      }
    }
  }


  async refreshToken(refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token || ""
        , { secret: JwtConfig.JWT_SECRET });

      // Use only the necessary parts of the payload for the new token
      const newToken = await this.jwtService.signAsync({ user: payload.user }, {
        secret: JwtConfig.JWT_SECRET,
        expiresIn: JwtConfig.TOKEN_ALIVE_TIME
      });

      return {
        user: payload.user,
        accessToken: newToken,
      };
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException('Invalid or expired refresh token');
    }
  }


  private async validatePassword(password: string, user: UserEntity) {
    try {
      return await bcrypt.compare(password, user.password!)
    } catch (error) {
      return false;
    }
  }

  private extractToken(requestToken: string): string | undefined {
    const [type, token] = requestToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
