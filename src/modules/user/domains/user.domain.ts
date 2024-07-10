import { UserProfile } from './user-profile.domain';
import { InputFile } from '../../upload/domains/file.domain';

export class User {
  private readonly _id?: string | null;
  private readonly _loginId?: string;
  private readonly _password?: string;

  private readonly _userProfile: UserProfile;
  private readonly _createdAt?: Date | undefined;
  private readonly _updatedAt?: Date;

  constructor(user: {
    id?: string;
    loginId: string;
    password: string;
    userProfile: UserProfile;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    (this._id = user.id),
      (this._loginId = user.loginId),
      (this._password = user.password),
      (this._userProfile = user.userProfile);
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  toEntity() {
    return {
      id: this._id,
      loginId: this._loginId,
      password: this._password,
      userProfile: this._userProfile.toEntity(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
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
    return this._password === password;
  }

  getUserId() {
    return this._id;
  }

  getUserLoginId() {
    return this._loginId;
  }
}
