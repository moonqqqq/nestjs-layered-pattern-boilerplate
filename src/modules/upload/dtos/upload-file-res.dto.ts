import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileResDTO {
  @ApiProperty({ example: '90b9f8c4-8786-4e92-a472-6ce72cf70d7d' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'file.png', description: 'organized file name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'file.png', description: 'original file name' })
  @IsString()
  originalName: string;

  @ApiProperty({
    example:
      'https://suppot-dev.s3.ap-northeast-2.amazonaws.com/image/Screenshot_2024-01-02_at_4.35.53_PM1709778505956.png',
  })
  @IsString()
  path: string;

  @ApiProperty({ example: '11230', description: 'file type' })
  @IsString()
  size: string;
}
