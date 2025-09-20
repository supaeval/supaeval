import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DatasetEntity } from '../../datasets/entities/dataset.entity';

export class ProjectEntity {
  @ApiProperty({
    description: 'The unique identifier of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the project',
    example: 'E-commerce Platform',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    example:
      'A modern e-commerce platform with advanced features and analytics',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The type of the project',
    enum: ProjectType,
    example: ProjectType.IMAGE_EXTRACTION,
  })
  @IsIn(Object.values(ProjectType))
  type: ProjectType;

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
    description: 'The organization ID that owns this project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    description: 'The user ID who created this project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  createdById: string;

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
