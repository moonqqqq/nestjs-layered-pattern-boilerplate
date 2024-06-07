import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
}));
