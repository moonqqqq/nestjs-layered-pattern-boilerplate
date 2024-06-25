import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';
import { BaseExceptionFilter } from '@nestjs/core';
import { InternalErrorBody } from '../../common/error-bodies/internal-error-body';

@Catch()
export class UnhandledExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly logger: ILoggerService) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const message =
      process.env.NODE_ENV !== 'prod'
        ? // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          (exception as any).message
        : '';
    const error = InternalErrorBody.INTERNAL_SERVER_ERROR;

    // Send alert here or in logging server
    this.logger.error(
      `[${new Date()}] [${req.method}] ${req.url} / body: ${
        req.body
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      } / code:${error}- ${exception} - ${(exception as any).stack}}`,
    );

    res.status(status).json({ ...error, detail: message });
  }
}
