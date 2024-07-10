import { IFile } from '@nestjs/common/pipes/file/interfaces';

export interface IUser {
  id?: string | null;
  userProfile: IUserProfile;
  createdAt?: Date | undefined;
  updatedAt?: Date;
}

export interface IUserProfile {
  name: string;
  phoneNumber: string;
  profileImage?: IFile;
}
