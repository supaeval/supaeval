import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FileUploadProvider,
  SignedUploadUrl,
} from '../interfaces/file-upload.provider.interface';
import { Environment } from '../../config/validate-env';

@Injectable()
export class GcsProvider implements FileUploadProvider {
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService<Environment>) {
    // Initialize storage lazily to avoid circular dependency issues
  }

  private initializeStorage() {
    if (this.storage) return;

    const projectId = this.configService.get('GCS_PROJECT_ID', { infer: true });
    const keyFilename = this.configService.get('GCS_KEY_FILENAME', {
      infer: true,
    });
    this.bucketName = this.configService.get('GCS_BUCKET_NAME', {
      infer: true,
    })!;

    if (!projectId || !this.bucketName) {
      throw new Error(
        'GCS_PROJECT_ID and GCS_BUCKET_NAME must be defined in environment variables.',
      );
    }

    this.storage = new Storage({
      projectId,
      keyFilename, // Optional, if running on GCP, credentials are auto-discovered
    });
  }

  async signUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn: number = 3600,
  ): Promise<SignedUploadUrl> {
    this.initializeStorage();

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);

      const [signedUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + expiresIn * 1000,
        contentType,
      });

      // For GCS, we return the signed URL directly
      // The fields object is empty as GCS handles this differently than S3
      return {
        url: signedUrl,
        fields: {},
        expiresIn,
      };
    } catch (error) {
      throw new Error(`Failed to generate signed upload URL: ${error.message}`);
    }
  }

  async getDownloadUrl(
    fileName: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    this.initializeStorage();

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);

      const [signedUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + expiresIn * 1000,
      });

      return signedUrl;
    } catch (error) {
      throw new Error(`Failed to generate download URL: ${error.message}`);
    }
  }

  async delete(fileName: string): Promise<void> {
    this.initializeStorage();

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);

      await file.delete();
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
