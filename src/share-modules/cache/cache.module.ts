// cache-manager has error on integrating with redis now. use jestjs-redis instead [5.feb.2023]
import { Module } from '@nestjs/common';
import { ICacheService } from './interfaces/cache.interface';
import { CustomRedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [CustomRedisModule],
  providers: [
    {
      provide: ICacheService,
      useClass: RedisService,
    },
  ],
  exports: [ICacheService],
})
export class CacheModule {}
