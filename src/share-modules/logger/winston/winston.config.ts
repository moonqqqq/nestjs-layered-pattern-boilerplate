import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const logDir = 'logs';

const dailyLoggerOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `${level}-%DATE%.log`,
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
  };
};

export const WinstomSettingModule = WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(`${process.env.APP_NAME}`, {
          prettyPrint: true,
        }),
      ),
    }),
    new DailyRotateFile(dailyLoggerOptions('error')),
    new DailyRotateFile(dailyLoggerOptions('warn')),
    new DailyRotateFile(dailyLoggerOptions('info')),
  ],
});
