import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { AnnotationWithResourceStatusDto } from './annotation-with-resource-status.dto';

export class ListAnnotationsResponseDto extends ListResponseDto<AnnotationWithResourceStatusDto> {
  @ApiProperty({
    description: 'Array of annotations with resource status',
    type: [AnnotationWithResourceStatusDto],
  })
  @ValidateNested({ each: true })
  @Type(() => AnnotationWithResourceStatusDto)
  declare items: AnnotationWithResourceStatusDto[];
}
