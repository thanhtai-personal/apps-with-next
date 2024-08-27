// import { UseFilters } from '@nestjs/common';
// import { AppExceptionsFilter } from "./AppExceptionsFilter"
import { SetMetadata } from '@nestjs/common';

// export function CatchExceptions(): MethodDecorator {
//   return (target, propertyKey, descriptor: PropertyDescriptor) => {
//     UseFilters(AppExceptionsFilter)(target, propertyKey, descriptor);
//   };
// }
export const CatchExceptions = () => SetMetadata('catchExceptions', true);

export * from "./AppExceptionsFilter"
export * from "./ExceptionInterceptor"