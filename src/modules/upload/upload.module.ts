import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller';
import { IUploadService } from './interfaces/upload-service.interface';
import { FileService } from './file.service';
import { LoggerModule } from '../../share-modules/logger/logger.module';
import { InputFileRepository } from './input-file-repository';

@Module({
  imports: [LoggerModule],
  controllers: [UploadController],
  providers: [
    {
      provide: IUploadService,
      useClass: S3Service,
    },
    FileService,
    InputFileRepository,
  ],
  exports: [FileService, InputFileRepository],
})
export class UploadModule {}
