import { Request, Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common"


@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    response.status?.(status)?.json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    });
  }
}