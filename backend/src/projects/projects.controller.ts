import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectResponseDto } from './dto/create-project.response.dto';
import { ListProjectsResponseDto } from './dto/list-projects.response.dto';

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
}
