import { Global, Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { LoggerModule } from '../logger/logger.module';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
