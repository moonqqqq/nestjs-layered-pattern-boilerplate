import { File } from '@prisma/client';

export abstract class IUploadService {
  // uploadImage: (file: Express.Multer.File) => Promise<{ savedURL: string }>;
  uploadCertificateImage: (file: Express.Multer.File) => Promise<File>;
  uploadFile: (file: Express.Multer.File) => Promise<File>;
}
