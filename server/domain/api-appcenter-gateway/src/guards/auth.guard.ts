import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { AuthMessages, UMS_SERVICE } from "@core-api/microservices-utils";
import Cookies from 'universal-cookie';

const {
  Injectable,
  UnauthorizedException,
} = NEST_COMMON



@Injectable()
export class AuthGuard implements NEST_COMMON.CanActivate {
  constructor(@NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,) { }

  async canActivate(context: NEST_COMMON.ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isValidated = await this.validateRequest(request);
    return isValidated;
  }

  private async validateRequest(request: any) {
    const token = request.headers["authorization"] || ""
    const cookies = new Cookies(request.headers.cookie, { path: '/' });
    const refreshToken = cookies.get('refreshToken')
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.umsClient.send({ cmd: AuthMessages.VALIDATE_TOKEN }, { token, refreshToken }).toPromise();
      request['auth'] = payload;
      // add more data (roles, permission) to check in other service

      return true;
    } catch (error) {
      return false;
    }

  }
}