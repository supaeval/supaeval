import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DatasetEntity } from './entities/dataset.entity';
import { GetDatasetResponseDto } from './dto/get-dataset.response.dto';
import { Result } from 'typescript-result';
import { DatasetNotFoundError, DatasetError } from './datasets.errors';

@Injectable()
export class DatasetsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(
    datasetId: string,
  ): Promise<
    Result<GetDatasetResponseDto, DatasetNotFoundError | DatasetError>
  > {
    try {
      const dataset = await this.prisma.dataset.findUnique({
        where: {
          id: datasetId,
        },
        // Explicitly exclude records to avoid fetching them
        select: {
          id: true,
          projectId: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!dataset) {
        return Result.error(new DatasetNotFoundError('Dataset not found'));
      }

      return Result.ok(dataset as GetDatasetResponseDto);
    } catch (error) {
      return Result.error(new DatasetError('Failed to fetch dataset'));
    }
  }
}
