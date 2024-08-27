import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from '@/services/users/users.service';

export const ValidateTapAction = createParamDecorator(
  async (_data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const moduleRef = request['moduleRef'] as ModuleRef;
    if (!moduleRef) {
      throw new HttpException('Module reference is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const userService = moduleRef.get(UsersService, { strict: false });
    if (!userService) {
      throw new HttpException('Validation service is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await userService.validate(request);
    return request;
  }
);
