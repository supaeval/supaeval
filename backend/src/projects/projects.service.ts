import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import {
  CreateProjectError,
  UserNotFoundError,
  OrganizationNotFoundError,
  ProjectError,
} from './projects.errors';
import { Result } from 'typescript-result';
import { ListResponseData } from '../common/interfaces/list-response.interface';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
    organizationId: string,
  ): Promise<Result<ProjectEntity, CreateProjectError>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return Result.error(new UserNotFoundError('User not found'));
    }

    const organization = await this.prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      return Result.error(
        new OrganizationNotFoundError('Organization not found'),
      );
    }

    const project: ProjectEntity = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        type: createProjectDto.type,
        organizationId: organizationId,
        createdById: userId,
      },
    });

    return Result.ok(project);
  }

  async list(
    organizationId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Result<ListResponseData<ProjectEntity>, CreateProjectError>> {
    try {
      // Check if organization exists
      const organization = await this.prisma.organization.findUnique({
        where: { id: organizationId },
      });

      if (!organization) {
        return Result.error(
          new OrganizationNotFoundError('Organization not found'),
        );
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Get total count
      const totalCount = await this.prisma.project.count({
        where: {
          organizationId: organizationId,
        },
      });

      // Get projects with pagination
      const projects = await this.prisma.project.findMany({
        where: {
          organizationId: organizationId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      });

      // Calculate next page
      const nextPage = skip + limit < totalCount ? page + 1 : null;

      const responseData: ListResponseData<ProjectEntity> = {
        items: projects as ProjectEntity[],
        count: totalCount,
        page,
        nextPage,
      };

      return Result.ok(responseData);
    } catch (error) {
      return Result.error(new ProjectError('Failed to list projects'));
    }
  }
}
