import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserProfile } from '../../modules/user/domains/user-profile.domain';
import { InputFile } from '../../modules/upload/domains/file.domain';
import { InputFileResDto } from '../../modules/upload/dtos/upload-file-res.dto';

export class UserProfileResDto {
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _phoneNumber: string;
  @Exclude() private readonly _profileImage: InputFile;

  constructor(userProfile: UserProfile) {
    this._name = userProfile.name;
    this._phoneNumber = userProfile.phoneNumber;
    this._profileImage = userProfile.profileImage;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty({ example: 'loginid123' })
  @Expose()
  get phoneNumber(): string {
    return this._phoneNumber;
  }

  @ApiPropertyOptional({ example: 'loginid123' })
  @Expose()
  get profileImage(): InputFileResDto | null {
    return this._profileImage ? new InputFileResDto(this._profileImage) : null;
  }
}
