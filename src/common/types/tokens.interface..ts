import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ITokens {
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  refreshToken: string;
}
