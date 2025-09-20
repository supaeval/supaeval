import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { DatasetsService } from './datasets.service';
import { GetDatasetResponseDto } from './dto/get-dataset.response.dto';

@ApiTags('datasets')
@Controller('datasets')
export class DatasetsController {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get dataset by ID',
    description:
      'Retrieve a dataset by its unique identifier without fetching records',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the dataset',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Dataset retrieved successfully',
    type: GetDatasetResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dataset not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Dataset not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch dataset',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to fetch dataset' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async getById(@Param('id') id: string): Promise<GetDatasetResponseDto> {
    const result = await this.datasetsService.getById(id);

    const [dataset, error] = result.toTuple();

    if (dataset) {
      return dataset;
    }

    switch (error.type) {
      case 'dataset-not-found-error':
        throw new NotFoundException(error.message);
      default:
        throw new InternalServerErrorException('Failed to fetch dataset');
    }
  }
}
