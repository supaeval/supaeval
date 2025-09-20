import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  NotFoundException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectResponseDto } from './dto/create-project.response.dto';
import { GetProjectResponseDto } from './dto/get-project.response.dto';
import { ListProjectsResponseDto } from './dto/list-projects.response.dto';
import { UploadFileDto } from '../datasets/dto/upload-file.dto';
import { UploadFileResponseDto } from '../datasets/dto/upload-file.response.dto';

const mockUserId = 'B4549232-1eaa-40a4-90d2-6fe4a5b19bff';
const mockOrganizationId = '04549232-1eaa-40a4-90d2-6fe4a5b19bfc';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Create a new project with the specified name, description, and type',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: CreateProjectResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Validation failed' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 422 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Unprocessable Entity' },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Organization not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 422 },
        message: { type: 'string', example: 'Organization not found' },
        error: { type: 'string', example: 'Unprocessable Entity' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to create project',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to create project' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponseDto> {
    const result = await this.projectsService.create(
      createProjectDto,
      mockUserId,
      mockOrganizationId,
    );

    const [project, error] = result.toTuple();

    if (!error) {
      return project;
    }

    switch (error.type) {
      case 'user-not-found-error':
        throw new UnprocessableEntityException('User not found');
      case 'organization-not-found-error':
        throw new UnprocessableEntityException('Organization not found');
      default:
        throw new InternalServerErrorException('Failed to create project');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'List all projects',
    description: 'Get all projects for the organization with pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully',
    type: ListProjectsResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Organization not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 422 },
        message: { type: 'string', example: 'Organization not found' },
        error: { type: 'string', example: 'Unprocessable Entity' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to list projects',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to list projects' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ListProjectsResponseDto> {
    const result = await this.projectsService.list(
      mockOrganizationId,
      page || 1,
      limit || 10,
    );

    const [listData, error] = result.toTuple();

    if (!error) {
      return listData;
    }

    switch (error.type) {
      case 'organization-not-found-error':
        throw new UnprocessableEntityException('Organization not found');
      default:
        throw new InternalServerErrorException('Failed to list projects');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get project by ID',
    description:
      'Retrieve a project by its unique identifier including its datasets',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully',
    type: GetProjectResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Project not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch project',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to fetch project' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async getById(@Param('id') id: string): Promise<GetProjectResponseDto> {
    const result = await this.projectsService.getById(id);

    const [project, error] = result.toTuple();

    if (project) {
      return project;
    }

    switch (error.type) {
      case 'project-error':
        if (error.message === 'Project not found') {
          throw new NotFoundException(error.message);
        }
        throw new InternalServerErrorException('Failed to fetch project');
      default:
        throw new InternalServerErrorException('Failed to fetch project');
    }
  }

  @Post(':projectId/datasets/:datasetId/upload')
  @ApiOperation({
    summary: 'Upload file to project dataset',
    description:
      'Generate a signed URL for uploading a file to the project dataset',
  })
  @ApiParam({
    name: 'projectId',
    description: 'The ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'datasetId',
    description: 'The ID of the dataset',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  @ApiResponse({
    status: 201,
    description: 'Upload URL generated successfully',
    type: UploadFileResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Validation failed' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description:
      'Dataset not found or does not belong to the specified project',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 422 },
        message: {
          type: 'string',
          example:
            'Dataset not found or does not belong to the specified project',
        },
        error: { type: 'string', example: 'Unprocessable Entity' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to generate upload URL',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to generate upload URL' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async uploadFile(
    @Param('projectId') projectId: string,
    @Param('datasetId') datasetId: string,
    @Body() uploadFileDto: UploadFileDto,
  ): Promise<UploadFileResponseDto> {
    const result = await this.projectsService.generateUploadUrl(
      projectId,
      datasetId,
      uploadFileDto.fileName,
      uploadFileDto.contentType,
    );

    const [uploadData, error] = result.toTuple();

    if (!error) {
      return uploadData;
    }

    switch (error.type) {
      case 'project-error':
        throw new UnprocessableEntityException(error.message);
      default:
        throw new InternalServerErrorException('Failed to generate upload URL');
    }
  }
}
