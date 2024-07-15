import { UserProfile } from '../../user-profile/domains/user-profile.domain';
import { TUserQueryIncludeStatement } from '../types/user-entity-include.type';

export class User {
  readonly id?: string | null;
  readonly loginId: string;
  readonly password: string;

  readonly userProfile: UserProfile;
  readonly createdAt?: Date | undefined;
  readonly updatedAt?: Date;

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

  static fromEntity(userEntity: TUserQueryIncludeStatement) {
    return new User({
      ...userEntity,
      userProfile: UserProfile.fromEntity(userEntity.userProfile),
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
