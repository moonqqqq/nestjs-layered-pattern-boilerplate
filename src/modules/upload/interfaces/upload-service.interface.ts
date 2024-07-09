import { FileEntity } from '@prisma/client';

export abstract class IUploadService {
  // uploadImage: (file: Express.Multer.File) => Promise<{ savedURL: string }>;
  uploadCertificateImage: (file: Express.Multer.File) => Promise<FileEntity>;
  uploadFile: (file: Express.Multer.File) => Promise<FileEntity>;
}
