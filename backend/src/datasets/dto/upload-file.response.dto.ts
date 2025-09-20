import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsNumber, IsNotEmpty } from 'class-validator';

export class UploadFileResponseDto {
  @ApiProperty({
    description: 'The signed upload URL',
    example:
      'https://storage.googleapis.com/bucket/projects/123/datasets/456/1234567890-image.jpg?X-Goog-Algorithm=...',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Additional fields for the upload request',
    example: {},
  })
  @IsObject()
  fields: Record<string, string>;

  @ApiProperty({
    description: 'Expiration time in seconds',
    example: 3600,
  })
  @IsNumber()
  expiresIn: number;
}
