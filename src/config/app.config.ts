import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  // frontendDomain: process.env.FRONTEND_DOMAIN,
  // backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',

  jwtSecret: process.env.JWT_SECRET || 'doyouwannabuildasnowman',
  jwtAccessExpire: process.env.JWT_EXPIRE_TIME_ACCESS || '30m',
  jwtRefreshExpire: process.env.JWT_EXPIRE_TIME_REFRESH || '15d',

  doubleuBizNumber: process.env.DOUBLEU_BIZ_NUMBER || 'doubleu_biz_number',
}));
