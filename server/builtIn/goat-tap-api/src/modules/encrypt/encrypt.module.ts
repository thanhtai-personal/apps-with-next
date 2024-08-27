import { CryptoService } from "@/services/encrypt/encrypt.service";
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    CryptoService
  ],
  controllers: [],
  exports: [CryptoService],
})
export class CryptoModule { }
