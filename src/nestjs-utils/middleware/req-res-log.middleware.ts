import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';

@Injectable()
export class reqResLogMiddleware implements NestMiddleware {
  constructor(private readonly logger: ILoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // REQ
    this.logger.info(`STARTED [${method}] ${originalUrl} - ${ip} ${userAgent}`);
    if (req.method === 'GET' && req.query) {
      this.logger.info(`Query Parameters : ${JSON.stringify(req.query)}`);
    } else if (req.body) {
      const printData = JSON.parse(JSON.stringify(req.body));
      Object.keys(printData).forEach((k) => {
        if (k.toLowerCase().indexOf('password') > -1) {
          printData[k] = '[FILTERED]';
        }
      });
      this.logger.info(`Parameters : ${JSON.stringify(printData)}`);
    }

    // RES
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.info(
        `FINISHED [${method}] ${originalUrl} ${statusCode} - ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
