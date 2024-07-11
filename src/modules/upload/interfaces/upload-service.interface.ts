import { InputFile } from '../domains/file.domain';

export abstract class IUploadService {
  // uploadImage: (file: Express.Multer.File) => Promise<{ savedURL: string }>;
  uploadCertificateImage: (file: Express.Multer.File) => Promise<InputFile>;
  uploadFile: (file: Express.Multer.File) => Promise<InputFile>;
}
