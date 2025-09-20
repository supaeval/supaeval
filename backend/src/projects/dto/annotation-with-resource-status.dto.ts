import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsUUID, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceStatus } from '@prisma/client';
import { AnnotationEntity } from '../entities/annotation.entity';

export class AnnotationWithResourceStatusDto extends AnnotationEntity {
  @ApiProperty({
    description: 'The annotation status of the associated resource',
    enum: ResourceStatus,
    example: ResourceStatus.PENDING_ANNOTATION,
  })
  @IsIn(Object.values(ResourceStatus))
  @IsNotEmpty()
  resourceStatus: ResourceStatus;

  @ApiProperty({
    description: 'The storage key of the associated resource',
    example: 'projects/123/datasets/456/uploaded-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  resourceStorageKey: string;
}
