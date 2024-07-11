import { InputFile } from '../../upload/domains/file.domain';

export class UserProfile {
  private readonly name: string;
  private readonly phoneNumber: string;
  private readonly profileImage?: InputFile;

  constructor(userProfile: {
    name: string;
    phoneNumber: string;
    profileImage?: InputFile;
  }) {
    (this.name = userProfile.name),
      (this.phoneNumber = userProfile.phoneNumber),
      (this.profileImage = userProfile.profileImage);
  }

  toEntity() {
    return {
      name: this.name,
      phoneNumber: this.phoneNumber,
      profileImage: this.profileImage.toEntity(),
    };
  }
}
