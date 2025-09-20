import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { GetProjectResponseDto } from './dto/get-project.response.dto';
import { ListResourcesResponseDto } from './dto/list-resources.response.dto';
import { ResourceWithSignedUrlDto } from './dto/resource-with-signed-url.dto';
import { ProjectEntity } from './entities/project.entity';
import { ResourceEntity } from './entities/resource.entity';
import {
  CreateProjectError,
  CreateResourceError,
  UserNotFoundError,
  OrganizationNotFoundError,
  ProjectError,
  ResourceError,
} from './projects.errors';
import { Result } from 'typescript-result';
import { ListResponseData } from '../common/interfaces/list-response.interface';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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

    const projectWithDatasets = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        type: createProjectDto.type,
        organizationId: organizationId,
        createdById: userId,
        datasets: {
          create: {
            version: 1,
          },
        },
      },
      include: {
        datasets: true,
      },
    });

    // Convert the result to match our entity structure
    const project: ProjectEntity = {
      ...projectWithDatasets,
      datasets: projectWithDatasets.datasets || undefined,
    };

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

  async getById(
    projectId: string,
  ): Promise<Result<GetProjectResponseDto, ProjectError>> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id: projectId },
        include: {
          datasets: true,
        },
      });

      if (!project) {
        return Result.error(new ProjectError('Project not found'));
      }

      return Result.ok(project as GetProjectResponseDto);
    } catch (error) {
      return Result.error(new ProjectError('Failed to fetch project'));
    }
  }

  async getProjectWithDatasets(projectId: string) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id: projectId },
        include: {
          datasets: true,
        },
      });

      return project;
    } catch (error) {
      return null;
    }
  }

  async getDatasetByProjectAndDatasetId(projectId: string, datasetId: string) {
    try {
      const dataset = await this.prisma.dataset.findFirst({
        where: {
          id: datasetId,
          projectId: projectId,
        },
      });

      return dataset;
    } catch (error) {
      return null;
    }
  }

  async generateUploadUrl(
    projectId: string,
    fileName: string,
    contentType: string,
  ): Promise<
    Result<
      { url: string; fields: Record<string, string>; expiresIn: number },
      CreateProjectError
    >
  > {
    try {
      // Generate unique file name with project and dataset context
      const timestamp = Date.now();
      const uniqueFileName = `projects/${projectId}/${timestamp}-${fileName}`;

      // Generate signed upload URL using the file upload service
      const signedUrl = await this.fileUploadService.signUploadUrl(
        uniqueFileName,
        contentType,
        3600, // 1 hour expiration
      );

      return Result.ok({
        url: signedUrl.url,
        fields: signedUrl.fields,
        expiresIn: signedUrl.expiresIn,
      });
    } catch (error) {
      return Result.error(new ProjectError('Failed to generate upload URL'));
    }
  }

  async createResource(
    projectId: string,
    createResourceDto: CreateResourceDto,
    userId: string,
  ): Promise<Result<ResourceEntity, CreateResourceError>> {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return Result.error(new UserNotFoundError('User not found'));
    }

    // Verify project exists and belongs to user's organization
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        organization: true,
      },
    });

    if (!project) {
      return Result.error(new ProjectError('Project not found'));
    }

    if (project.organizationId !== user.organizationId) {
      return Result.error(new ProjectError('Project not found'));
    }

    const resource = await this.prisma.resource.create({
      data: {
        type: createResourceDto.type,
        storageProvider: createResourceDto.storageProvider,
        storageKey: createResourceDto.storageKey,
        projectId: projectId,
      },
    });

    return Result.ok(resource);
  }

  async listResources(
    projectId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<
    Result<ListResponseData<ResourceWithSignedUrlDto>, CreateProjectError>
  > {
    try {
      // Check if project exists
      const project = await this.prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return Result.error(new ProjectError('Project not found'));
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Get total count
      const totalCount = await this.prisma.resource.count({
        where: {
          projectId: projectId,
        },
      });

      // Get resources with pagination
      const resources = await this.prisma.resource.findMany({
        where: {
          projectId: projectId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      });

      // Generate signed download URLs for each resource
      const resourcesWithSignedUrls: ResourceWithSignedUrlDto[] =
        await Promise.all(
          resources.map(async (resource) => {
            const signedDownloadUrl =
              await this.fileUploadService.getDownloadUrl(
                resource.storageKey,
                3600, // 1 hour expiration
              );

            return {
              ...resource,
              signedDownloadUrl,
            } as ResourceWithSignedUrlDto;
          }),
        );

      // Calculate next page
      const nextPage = skip + limit < totalCount ? page + 1 : null;

      const responseData: ListResponseData<ResourceWithSignedUrlDto> = {
        items: resourcesWithSignedUrls,
        count: totalCount,
        page,
        nextPage,
      };

      return Result.ok(responseData);
    } catch (error) {
      return Result.error(new ProjectError('Failed to list resources'));
    }
  }
}
