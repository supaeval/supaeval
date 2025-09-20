import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDatasetResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the dataset',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The ID of the project this dataset belongs to',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'The version number of the dataset',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  version: number;

  @ApiProperty({
    description: 'The creation timestamp',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'The last update timestamp',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
