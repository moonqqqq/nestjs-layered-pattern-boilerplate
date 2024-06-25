import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

// :TODO need to unify the types between filters
@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const detail: any = exception.getResponse();
    return res.status(exception.getStatus()).json({
      //   errorCode: exception.errorCode,
      message: detail?.message ?? exception.message, // this is written like this only for the class-validator exception
      stack: process.env.NODE_ENV === 'dev' ? exception.stack : undefined,
    });
  }
}
