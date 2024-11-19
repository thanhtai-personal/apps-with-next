import { NEST_COMMON } from "@core-api/nest-core";

@NEST_COMMON.Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
