import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
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
}
