import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const catchExceptions = this.reflector.get<boolean>('catchExceptions', context.getHandler());
    if (!catchExceptions) {
      return next.handle();
    }

    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          throw err;
        }
        // Handle the exception and throw it
        throw new BadRequestException(err.message || 'Internal server error');
      }),
    );
  }
}
