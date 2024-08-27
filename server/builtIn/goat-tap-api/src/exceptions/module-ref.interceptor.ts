import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ModuleRefInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request['moduleRef'] = this.moduleRef;
    return next.handle();
  }
}
