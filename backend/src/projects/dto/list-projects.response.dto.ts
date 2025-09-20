import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { ProjectEntity } from '../entities/project.entity';

export class ListProjectsResponseDto extends ListResponseDto<ProjectEntity> {
  @ApiProperty({
    description: 'Array of projects',
    type: [ProjectEntity],
  })
  @ValidateNested({ each: true })
  @Type(() => ProjectEntity)
  declare items: ProjectEntity[];
}
