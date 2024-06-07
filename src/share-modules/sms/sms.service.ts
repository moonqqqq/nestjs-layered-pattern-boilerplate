import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '../logger/interface/logger-service.interface';
import { SolapiMessageService } from 'solapi';

@Injectable()
export class SmsService {
  constructor(
    private configService: ConfigService,
    private readonly logger: ILoggerService,
  ) {}

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    const messageService = new SolapiMessageService(
      this.configService.get('util.solapiApiKey'),
      this.configService.get('util.solapiSecretKey'),
    );

    try {
      await messageService.send({
        to: phoneNumber,
        from: this.configService.get('util.smsSenderNumber'),
        text: `The authentication otp is [${otp}]`,
      });
      this.logger.info(`SEND_OTP::phoneNumber-${phoneNumber}::otp-${otp}`);
    } catch (err) {
      this.logger.error('SMS solapi error');
      this.logger.error(err);
    }
  }
}
