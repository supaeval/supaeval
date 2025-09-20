import { Dataset } from '@prisma/client';

export class DatasetEntity implements Dataset {
  id: string;
  projectId: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
