import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiPropertyOptional({ example: 'Park' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: '01043214321' })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiPropertyOptional({ example: 'dfjieo2323-dfnjenofd~' })
  @IsString()
  @IsOptional()
  profileImageId: string;
}
