import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { AuthMessages, UMS_SERVICE } from "@core-api/microservices-utils";

const { Injectable } = NEST_COMMON

@Injectable()
export class AuthService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {

  }

  async register(data: any): Promise<any> {
    try {
      const response = await this.umsClient.send({ cmd: AuthMessages.REGISTER }, data || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async login(data: any): Promise<any> {
    try {
      const response = await this.umsClient.send({ cmd: AuthMessages.SIGN_IN }, data || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async getAuthentication(token: string, refreshToken?: string): Promise<any> {
    try {
      const response = await this.umsClient.send({ cmd: AuthMessages.GET_AUTH }, { token, refreshToken }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async refreshToken(refreshToken: string) {
    try {
      const response = await this.umsClient.send({ cmd: AuthMessages.REFRESH_TOKEN },  { refreshToken }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async resetPassword(data: any) {
    try {
      const response = await this.umsClient.send({ cmd: AuthMessages.RESET_PASSWORD }, data || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}
