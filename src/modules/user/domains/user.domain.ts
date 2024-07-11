import { UserProfile } from './user-profile.domain';
import { InputFile } from '../../upload/domains/file.domain';

export class User {
  private readonly id?: string | null;
  private readonly loginId?: string;
  private readonly password?: string;

  private readonly userProfile: UserProfile;
  private readonly createdAt?: Date | undefined;
  private readonly updatedAt?: Date;

  constructor(user: {
    id?: string;
    loginId: string;
    password: string;
    userProfile: UserProfile;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    (this.id = user.id),
      (this.loginId = user.loginId),
      (this.password = user.password),
      (this.userProfile = user.userProfile);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  toEntity() {
    return {
      id: this.id,
      loginId: this.loginId,
      password: this.password,
      userProfile: this.userProfile.toEntity(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromEntity(userEntity: {
    id: string;
    loginId: string;
    password: string;
    userProfile: {
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
    };
  }) {
    let profileImage: InputFile;
    if (userEntity.userProfile.profileImage) {
      profileImage = new InputFile(userEntity.userProfile.profileImage);
    }

    const userProfile = new UserProfile({
      ...userEntity.userProfile,
      profileImage,
    });

    return new User({
      ...userEntity,
      userProfile,
    });
  }

  // just sampling. add encrypt, becrypt process
  checkPasswordCorrect(password): boolean {
    return this.password === password;
  }

  getUserId() {
    return this.id;
  }

  getUserLoginId() {
    return this.loginId;
  }
}
