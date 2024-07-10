import { UserProfile } from './user-profile.domain';

export class User {
  private readonly _id?: string | null;
  private readonly _loginId?: string;
  private readonly _password?: string;

  private readonly _userProfile: UserProfile;
  private readonly _createdAt?: Date | undefined;
  private readonly _updatedAt?: Date;

  constructor(
    id: string | null,
    loginId: string,
    password: string,
    userProfile: UserProfile,
    createdAt: Date,
    updatedAt: Date,
  ) {
    (this._id = id),
      (this._loginId = loginId),
      (this._password = password),
      (this._userProfile = userProfile);
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // just sampling. add encrypt, becrypt process
  checkPasswordCorrect(password): boolean {
    return this._password === password;
  }

  getUserId() {
    return this._id;
  }
}
