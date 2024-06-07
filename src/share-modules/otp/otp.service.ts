import { Injectable } from '@nestjs/common';
import {
  getOtpKey,
  getOtpSentCountKey,
  getSignupablePhoneNumberKey,
} from '../cache/key-generator';
import { ICacheService } from '../cache/interfaces/cache.interface';
import {
  NotMatchedOtp,
  OtpMaxTryExceed,
  VerificationExpired,
} from '../../nestjs-utils/exceptions/service-layer.exception';
import { CACHE_TTL } from '../cache/cache.constants';
import { SmsService } from '../sms/sms.service';
import { ConfigService } from '@nestjs/config';
import { ErrorBody } from '../../common/constants/error-body';

@Injectable()
export class OtpService {
  constructor(
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
    private readonly smsService: SmsService,
  ) {}

  async checkIsSignupablePhoneNumber(phoneNumber: string) {
    const key = getSignupablePhoneNumberKey(phoneNumber);
    const result = await this.cacheService.get(key);
    if (result !== 'true')
      throw new VerificationExpired(ErrorBody.VERIFICATION_EXPIRED);
  }

  async deleteSignupablePhoneNumberCache(phoneNumber: string) {
    await this.cacheService.del(getSignupablePhoneNumberKey(phoneNumber));
  }

  // :TODO - remove for loop
  #generateOtp(): string {
    if (this.configService.get('app.nodeEnv') !== 'prod') return '123123';

    const digits = '0123456789';
    const length = 6;

    let otp = '';
    for (let i = 1; i <= length; i += 1) {
      const index = Math.floor(Math.random() * digits.length);
      otp += digits[index];
    }

    return otp;
  }

  async #checkDoesExceedOtpMaxTry(phoneNumber) {
    const key = getOtpSentCountKey(phoneNumber);
    const countString = await this.cacheService.get(key);
    const count = Number(countString);

    if (count > 5) throw new OtpMaxTryExceed(ErrorBody.OTP_MAX_TRY_EXCEED);

    await this.cacheService.setex(
      key,
      CACHE_TTL.OTP,
      count ? Number(count) + 1 : 1,
    );
  }

  async sendSmsVerificationCode(phoneNumber: string) {
    await this.#checkDoesExceedOtpMaxTry(phoneNumber);

    // 1. generate key
    const otp = this.#generateOtp();

    // 2. send Sms
    if (this.configService.get('app.nodeEnv') !== 'dev') {
      await this.smsService.sendOtp(phoneNumber, otp);
    }

    // 3. save key
    await this.cacheService.setex(getOtpKey(phoneNumber), CACHE_TTL.OTP, otp);
  }

  async verifyOtp(phoneNumber: string, otp: string) {
    const key = getOtpKey(phoneNumber);
    const savedOtp = await this.cacheService.get(key);

    if (savedOtp !== otp) throw new NotMatchedOtp(ErrorBody.NOT_MATCHED_OTP);

    await this.cacheService.del(key);
    await this.cacheService.setex(
      getSignupablePhoneNumberKey(phoneNumber),
      CACHE_TTL.SIGNUPABLE_PHONE_NUMBER,
      true,
    );
  }
}
