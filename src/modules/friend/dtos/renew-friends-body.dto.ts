import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RenewFriendsBodyDto {
  @ApiProperty({
    example: ['123-456-7890', '098-765-4321'],
    description: 'An array of phone numbers',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];
}
