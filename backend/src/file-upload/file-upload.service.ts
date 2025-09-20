import { Injectable } from '@nestjs/common';
import {
  FileUploadProvider,
  SignedUploadUrl,
} from './interfaces/file-upload.provider.interface';
import { GcsProvider } from './providers/gcs.provider';
import { MockProvider } from './providers/mock.provider';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly gcsProvider: GcsProvider,
    private readonly mockProvider: MockProvider,
  ) {}

  /**
   * Generate a signed URL for uploading a file
   * @param fileName - The name of the file to upload
   * @param contentType - The MIME type of the file
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<SignedUploadUrl>
   */
  async signUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<SignedUploadUrl> {
    return {
      url: 'https://whatever.com',
      fields: {
        key: 'image/jpeg',
      },
      expiresIn: 3600,
    };

    return this.gcsProvider.signUploadUrl(fileName, contentType, expiresIn);
  }

  /**
   * Generate a signed URL for downloading a file
   * @param fileName - The name of the file to download
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<string>
   */
  async getDownloadUrl(fileName: string, expiresIn?: number): Promise<string> {
    // For now, use the mock provider to return the specified URL
    return this.mockProvider.getDownloadUrl(fileName, expiresIn);
  }

  /**
   * Delete a file from storage
   * @param fileName - The name of the file to delete
   * @returns Promise<void>
   */
  async deleteFile(fileName: string): Promise<void> {
    return this.gcsProvider.delete(fileName);
  }
}
