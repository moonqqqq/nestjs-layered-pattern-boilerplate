// cache-manager has error on integrating with redis now. use jestjs-redis instead [5.feb.2023]
import { Module } from '@nestjs/common';
import { CustomRedisModule } from '../cache/redis/redis.module';
import { OtpService } from './otp.service';

@Module({
  imports: [CustomRedisModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
