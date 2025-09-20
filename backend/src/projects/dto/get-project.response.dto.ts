import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectType } from '@prisma/client';
import { DatasetEntity } from '../../datasets/entities/dataset.entity';

export class GetProjectResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the project',
    example: 'My Awesome Project',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'A project for extracting data from images',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The type of the project',
    enum: ProjectType,
    example: ProjectType.MULTIMODAL,
  })
  @IsString()
  @IsNotEmpty()
  type: ProjectType;

  @ApiProperty({
    description: 'The ID of the organization this project belongs to',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    description: 'The ID of the user who created this project',
    example: '789e0123-e89b-12d3-a456-426614174002',
  })
  @IsString()
  @IsNotEmpty()
  createdById: string;

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

  @ApiProperty({
    description: 'The datasets associated with this project',
    type: [DatasetEntity],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DatasetEntity)
  datasets?: DatasetEntity[];
}
