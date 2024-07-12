import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/domains/user.domain';
import { UserProfile } from '../../user-profile/domains/user-profile.domain';
import { UserProfileResDto } from '../../user-profile/dtos/user-profile-res.dto';

export class UserResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _loginId: string;
  @Exclude() private readonly _password: string;
  @Exclude() private readonly _userProfile?: UserProfile;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;

  constructor(user: User) {
    this._id = user.id;
    this._loginId = user.loginId;
    this._password = user.password;
    this._userProfile = user.userProfile;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  @ApiProperty({ example: 'loginid123' })
  @Expose()
  get loginId(): string {
    return this._loginId;
  }

  @ApiProperty()
  @Expose()
  get userProfile(): UserProfileResDto {
    return new UserProfileResDto(this._userProfile);
  }

  @ApiProperty({ example: 'loginid123' })
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }

  @ApiProperty({ example: 'loginid123' })
  @Expose()
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
