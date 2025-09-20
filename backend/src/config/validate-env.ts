import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString, validateSync } from 'class-validator';

export class Environment {
  @IsOptional()
  PORT?: string;

  @IsOptional()
  BYPASS_AUTH?: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  API_KEY: string;

  // GCS Configuration
  @IsString()
  GCS_PROJECT_ID: string;

  @IsString()
  GCS_BUCKET_NAME: string;

  @IsOptional()
  GCS_KEY_FILENAME?: string;
}

export const validateEnv = (config: NodeJS.ProcessEnv): Environment => {
  const transformedEnv = plainToInstance(Environment, config);
  const errors = validateSync(transformedEnv);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformedEnv;
};
