import { CryptoService } from "@/services/encrypt/encrypt.service";
import { NEST_COMMON } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [],
  providers: [
    CryptoService
  ],
  controllers: [],
  exports: [CryptoService],
})
export class CryptoModule { }
