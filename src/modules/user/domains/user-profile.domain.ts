import { File } from '../../upload/domains/file.domain';

export class UserProfile {
  private readonly _name: string;
  private readonly _phoneNumber: string;
  private readonly _profileImage?: File;

  constructor(name: string, phoneNumber: string, profileImage?: File) {
    (this._name = name),
      (this._phoneNumber = phoneNumber),
      (this._profileImage = profileImage);
  }
}
