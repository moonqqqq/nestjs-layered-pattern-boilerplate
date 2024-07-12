import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserProfile } from '../../user-profile/domains/user-profile.domain';
import { User } from '../../user/domains/user.domain';
import { InputFile } from '../../upload/domains/file.domain';

export class SignupReqBodyDto {
  @ApiProperty({ example: 'loginid123' })
  @IsString()
  @MaxLength(20)
  loginId: string;

  @ApiProperty({ example: 'password33' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(16, { message: 'Password must be at most 20 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[a-zA-Z\d!@#$%^&*]*$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and optional special characters (!@#$%^&*)',
    },
  )
  password: string;

  @ApiProperty({ example: 'kim moon' })
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({ example: '01012341234' })
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @ApiPropertyOptional({ example: 'id-123123' })
  @IsString()
  @IsOptional()
  profileImageId: string;

  toDomain() {
    const profileImage = new InputFile({ id: this.profileImageId });
    const userProfile = new UserProfile({
      name: this.name,
      phoneNumber: this.phoneNumber,
      profileImage,
    });
    const user = new User({
      loginId: this.loginId,
      password: this.password,
      userProfile,
    });

    return user;
  }
}
