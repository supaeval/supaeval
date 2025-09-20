import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { ResourceWithSignedUrlDto } from './resource-with-signed-url.dto';

export class ListResourcesResponseDto extends ListResponseDto<ResourceWithSignedUrlDto> {
  @ApiProperty({
    description: 'Array of resources with signed download URLs',
    type: [ResourceWithSignedUrlDto],
  })
  @ValidateNested({ each: true })
  @Type(() => ResourceWithSignedUrlDto)
  declare items: ResourceWithSignedUrlDto[];
}
