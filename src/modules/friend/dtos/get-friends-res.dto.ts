import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserProfile } from '../../user-profile/domains/user-profile.domain';
import { User } from '../../user/domains/user.domain';
import { UserProfileResDto } from '../../user-profile/dtos/user-profile-res.dto';

export class GetFriendResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _loginId: string;
  @Exclude() private readonly _userProfile: UserProfile;

  constructor(user: User) {
    this._id = user.id;
    this._loginId = user.loginId;
    this._userProfile = user.userProfile;
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

  @ApiPropertyOptional()
  @Expose()
  get userProfile(): UserProfileResDto | null {
    return this._userProfile ? new UserProfileResDto(this._userProfile) : null;
  }
}
