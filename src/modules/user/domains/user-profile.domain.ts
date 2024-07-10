import { File } from '../../upload/domains/file.domain';

export class UserProfile {
  private readonly _name: string;
  private readonly _phoneNumber: string;
  private readonly _profileImage?: File;

  constructor(userProfile: {
    name: string;
    phoneNumber: string;
    profileImage?: File;
  }) {
    (this._name = userProfile.name),
      (this._phoneNumber = userProfile.phoneNumber),
      (this._profileImage = userProfile.profileImage);
  }
}
