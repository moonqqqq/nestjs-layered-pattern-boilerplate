import { InputFile } from '../../upload/domains/file.domain';
import { UpdateUserProfileDto } from '../../user-profile/dtos/update-user-profile-body.dto';

export class UserProfile {
  id?: string;
  name: string;
  phoneNumber: string;
  profileImage?: InputFile;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userProfile: {
    id?: string;
    name: string;
    phoneNumber: string;
    profileImage?: InputFile;
  }) {
    (this.id = userProfile.id),
      (this.name = userProfile.name),
      (this.phoneNumber = userProfile.phoneNumber),
      (this.profileImage = userProfile.profileImage);
  }

  static fromEntity(userProfile: {
    id: string;
    name: string;
    phoneNumber: string;
    profileImage?: {
      id: string;
      name: string;
      originalName: string;
      path: string;
      size: string;
      createdAt: Date;
    };
  }) {
    let profileImage: InputFile;
    if (userProfile.profileImage) {
      profileImage = new InputFile(userProfile.profileImage);
    }

    return new UserProfile({
      ...userProfile,
      profileImage,
    });
  }

  update(payload: UpdateUserProfileDto) {
    if (payload.name) this.name = payload.name;
    if (payload.phoneNumber) this.phoneNumber = payload.phoneNumber;
    if (payload.profileImageId) this.phoneNumber = payload.phoneNumber;
  }
}
