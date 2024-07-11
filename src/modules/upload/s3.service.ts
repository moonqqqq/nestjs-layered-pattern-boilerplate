import { Injectable } from '@nestjs/common';
import { IUploadService } from './interfaces/upload-service.interface';

import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { FILE_ENUM, FILE_ENUM_TYPE } from './file.constants';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';
import { InputFile } from './domains/file.domain';

@Injectable()
export class S3Service implements IUploadService {
  private s3: AWS.S3;

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILoggerService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: this.configService.get('s3.accessKeyId'),
      secretAccessKey: this.configService.get('s3.secretAccessKey'),
      region: this.configService.get('s3.region'),
    });
  }

  async uploadCertificateImage(file: Express.Multer.File) {
    const formattedFilename = this.#getFormattedFileName(file.originalname);
    const uploadResult = await this.#uploadImage(file, formattedFilename);

    const savedFile = await this.prisma.inputFileEntity.create({
      data: {
        name: this.#getFormattedFileName(file.originalname),
        originalName: file.originalname,
        path: uploadResult.savedURL,
        size: String(file.size),
      },
    });

    return new InputFile(savedFile);
  }

  async uploadFile(file: Express.Multer.File) {
    const formattedFilename = this.#getFormattedFileName(file.originalname);
    const uploadResult = await this.#uploadFile(file, formattedFilename);

    const savedFile = await this.prisma.inputFileEntity.create({
      data: {
        name: this.#getFormattedFileName(file.originalname),
        originalName: file.originalname,
        path: uploadResult.savedURL,
        size: String(file.size),
      },
    });

    return new InputFile(savedFile);
  }

  async #uploadImage(file: Express.Multer.File, formattedFilename: string) {
    try {
      await this.s3
        .upload({
          Key: this.#getFileKey(FILE_ENUM.IMAGE, formattedFilename),
          Body: file.buffer,
          ContentType: 'image/png',
          Bucket: this.configService.get('s3.bucket'),
        })
        .promise();
    } catch (err) {
      this.logger.error(err);
    }

    return {
      savedURL: this.#getSavedURL(FILE_ENUM.IMAGE, formattedFilename),
    };
  }

  async #uploadFile(file: Express.Multer.File, formattedFilename: string) {
    try {
      await this.s3
        .upload({
          Key: this.#getFileKey(FILE_ENUM.FILE, formattedFilename),
          Body: file.buffer,
          ContentDisposition: `attachment; filename="${formattedFilename}"`,
          // ContentType: file.mimetype,
          // ContentType: 'image/png',
          Bucket: this.configService.get('s3.bucket'),
        })
        .promise();
    } catch (err) {
      this.logger.error(err);
    }

    return {
      savedURL: this.#getSavedURL(FILE_ENUM.FILE, formattedFilename),
    };
  }

  /**
   * This is for cleaning up the filename. and make it not duplicatable by adding date
   */
  #getFormattedFileName(filename: string) {
    // Extract the extension without using split and pop:
    const extension = filename.match(/\.[^.]+$/)?.[0];

    if (!extension) {
      // Handle cases where there's no extension:
      return filename.trim().replace(/\s+/g, '_') + Date.now();
    }

    // Remove the extension from the filename before trimming:
    const baseName = filename.slice(0, -extension.length);
    return `${baseName.trim().replace(/\s+/g, '_')}${Date.now()}${extension}`;
  }

  /**
   * This is for setting the directory.
   * You can make it structured granularly by adding more directory like adding userId directory.
   */
  #getFileKey(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${fileType}/${formattedFilename}`;
  }

  /**
   * Get the full url file saved.
   */
  #getSavedURL(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${this.configService.get(
      's3.publicFileStorageDomain',
    )}/${this.#getFileKey(fileType, formattedFilename)}`;
  }
}
