import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import cacheConfig from './config/cache.config';
import utilConfig from './config/util.config';
import { LoggerModule } from './share-modules/logger/logger.module';
// import { CacheModule } from './shared/cache/cache.module';
import { reqResLogMiddleware } from './nestjs-utils/middleware/req-res-log.middleware';
import s3Config from './config/s3.config';
// import { DatabaseModule } from './shared/database/database.module';
import { SmsModule } from './share-modules/sms/sms.module';
import { DatabaseModule } from './share-modules/database/database.module';
import { OtpModule } from './share-modules/otp/otp.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod', // Store produnction env on cicd
      load: [appConfig, cacheConfig, utilConfig, s3Config],
    }),
    LoggerModule,
    // CacheModule,
    DatabaseModule,
    SmsModule,
    OtpModule,
    UploadModule,
    UserModule,
    AuthModule,
    UserProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(reqResLogMiddleware).forRoutes('*');
  }
}
