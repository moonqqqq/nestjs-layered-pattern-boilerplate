import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
