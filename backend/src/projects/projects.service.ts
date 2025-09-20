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
    datasetId: string,
    fileName: string,
    contentType: string,
  ): Promise<
    Result<
      { url: string; fields: Record<string, string>; expiresIn: number },
      CreateProjectError
    >
  > {
    try {
      // Verify dataset exists and belongs to the project
      const dataset = await this.getDatasetByProjectAndDatasetId(
        projectId,
        datasetId,
      );

      if (!dataset) {
        return Result.error(
          new ProjectError(
            'Dataset not found or does not belong to the specified project',
          ),
        );
      }

      // Generate unique file name with project and dataset context
      const timestamp = Date.now();
      const uniqueFileName = `projects/${projectId}/datasets/${datasetId}/${timestamp}-${fileName}`;

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
}
