import { AppService } from '@/services/app/app.service';
import { NEST_COMMON } from "@core-api/nest-core";

@NEST_COMMON.Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @NEST_COMMON.Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
