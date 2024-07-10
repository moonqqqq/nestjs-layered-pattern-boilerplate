import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SigninReqBodyDto {
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
}
