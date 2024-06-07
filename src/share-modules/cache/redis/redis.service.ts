import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ICacheService } from '../interfaces/cache.interface';

@Injectable()
export class RedisService implements ICacheService {
  constructor(
    @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis,
  ) {}

  async get(_key: string) {
    const value = await this.redis.get(_key);
    return value;
  }

  async set(key: string, value: any): Promise<'OK' | null> {
    return await this.redis.set(key, value);
  }

  async setex(key: string, seconds: number | string, value: any) {
    return await this.redis.setex(key, seconds, value);
  }

  async del(key: string) {
    await this.redis.del(key);
  }
}
