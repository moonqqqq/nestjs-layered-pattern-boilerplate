import { Module } from '@nestjs/common';
import { ILoggerService } from './interface/logger-service.interface';
import { WinstonLoggerService } from './winston/winston-logger.service';
import { WinstomSettingModule } from './winston/winston.config';

@Module({
  imports: [WinstomSettingModule],
  providers: [
    {
      provide: ILoggerService,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
