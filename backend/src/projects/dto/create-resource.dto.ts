import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ResourceType, StorageProvider } from '@prisma/client';

export class CreateResourceDto {
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
}
