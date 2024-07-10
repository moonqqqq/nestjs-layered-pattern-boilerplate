import { InputFile } from '../../upload/domains/file.domain';

export class UserProfile {
  private readonly _name: string;
  private readonly _phoneNumber: string;
  private readonly _profileImage?: InputFile;

  constructor(userProfile: {
    name: string;
    phoneNumber: string;
    profileImage?: InputFile;
  }) {
    (this._name = userProfile.name),
      (this._phoneNumber = userProfile.phoneNumber),
      (this._profileImage = userProfile.profileImage);
  }

  toEntity() {
    return {
      name: this._name,
      phoneNumber: this._phoneNumber,
      profileImage: this._profileImage.toEntity(),
    };
  }
}
