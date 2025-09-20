import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceType, StorageProvider, ResourceStatus } from '@prisma/client';

export class ResourceWithSignedUrlDto {
  @ApiProperty({
    description: 'The unique identifier of the resource',
    example: '789e0123-e89b-12d3-a456-426614174002',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The type of the resource',
    enum: ResourceType,
    example: ResourceType.IMAGE,
  })
  @IsIn(Object.values(ResourceType))
  @IsNotEmpty()
  type: ResourceType;

  @ApiProperty({
    description: 'The storage provider for the resource',
    enum: StorageProvider,
    example: StorageProvider.GCS,
  })
  @IsIn(Object.values(StorageProvider))
  @IsNotEmpty()
  storageProvider: StorageProvider;

  @ApiProperty({
    description: 'The storage key/path for the resource',
    example: 'projects/123/datasets/456/uploaded-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  storageKey: string;

  @ApiProperty({
    description: 'The ID of the project this resource belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'The annotation status of the resource',
    enum: ResourceStatus,
    example: ResourceStatus.PENDING_ANNOTATION,
  })
  @IsIn(Object.values(ResourceStatus))
  @IsNotEmpty()
  status: ResourceStatus;

  @ApiProperty({
    description: 'The creation timestamp of the resource',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'The last update timestamp of the resource',
    example: '2024-03-14T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'The signed download URL for the resource',
    example:
      'https://storage.googleapis.com/bucket/projects/123/datasets/456/uploaded-image.jpg?X-Goog-Algorithm=...',
  })
  @IsString()
  @IsNotEmpty()
  signedDownloadUrl: string;
}
