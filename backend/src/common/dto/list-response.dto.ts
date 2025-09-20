import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListResponseDto<T> {
  @ApiProperty({
    description: 'Array of items',
    isArray: true,
  })
  @IsArray()
  items: T[];

  @ApiProperty({
    description: 'Total count of items',
    example: 25,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    description: 'Next page number, null if no next page',
    example: 2,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  nextPage: number | null;
}
