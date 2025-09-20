import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Annotation } from '@prisma/client';

export class AnnotationEntity implements Annotation {
  @ApiProperty({
    description: 'The unique identifier of the annotation',
    example: '789e0123-e89b-12d3-a456-426614174002',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The ID of the resource this annotation belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  resourceId: string;

  @ApiProperty({
    description: 'The ID of the user who created this annotation',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @IsNotEmpty()
  createdById: string;

  @ApiProperty({
    description: 'The creation timestamp of the annotation',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'The last update timestamp of the annotation',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
