import { UserProfile } from './user-profile.domain';

export class User {
  private readonly _id?: string | null;
  private readonly _loginId?: string;
  private readonly _password?: string;

  private readonly _userProfile: UserProfile;
  private readonly _createdAt?: Date | undefined;
  private readonly _updatedAt?: Date;

  constructor(user: {
    id: string | null;
    loginId: string;
    password: string;
    userProfile: UserProfile;
    createdAt: Date;
    updatedAt: Date;
  }) {
    (this._id = user.id),
      (this._loginId = user.loginId),
      (this._password = user.password),
      (this._userProfile = user.userProfile);
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  // just sampling. add encrypt, becrypt process
  checkPasswordCorrect(password): boolean {
    return this._password === password;
  }

  getUserId() {
    return this._id;
  }
}
