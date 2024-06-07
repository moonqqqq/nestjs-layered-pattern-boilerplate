import { Inject, Injectable } from '@nestjs/common';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { ILoggerService } from '../interface/logger-service.interface';

@Injectable()
export class WinstonLoggerService implements ILoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  info(data) {
    this.logger.info(data);
  }

  error(err) {
    this.logger.error(err);
  }

  warn() {
    this.logger.warn(new Date());
  }
}
