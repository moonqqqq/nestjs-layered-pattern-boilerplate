// cache-manager has error on integrating with redis now. use jestjs-redis instead [5.feb.2023]
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import {
  RedisModule as _RedisModule,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ICacheService } from '../interfaces/cache.interface';

@Module({
  imports: [
    _RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: configService.get('cache.redisHost'),
            port: configService.get('cache.redisPort'),
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: ICacheService,
      useClass: RedisService,
    },
  ],
  exports: [ICacheService],
})
export class CustomRedisModule {}
