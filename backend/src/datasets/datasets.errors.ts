export class DatasetNotFoundError extends Error {
  type = 'dataset-not-found-error' as const;

  constructor(message: string) {
    super(message);
    this.name = 'DatasetNotFoundError';
  }
}

export class DatasetError extends Error {
  type = 'dataset-error' as const;

  constructor(message: string) {
    super(message);
    this.name = 'DatasetError';
  }
}

export type GetDatasetError = DatasetNotFoundError | DatasetError;
