import { Injectable } from '@nestjs/common';
import {
  FileUploadProvider,
  SignedUploadUrl,
} from './interfaces/file-upload.provider.interface';
import { GcsProvider } from './providers/gcs.provider';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadProvider: GcsProvider) {}

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
    return this.fileUploadProvider.signUploadUrl(
      fileName,
      contentType,
      expiresIn,
    );
  }

  /**
   * Generate a signed URL for downloading a file
   * @param fileName - The name of the file to download
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<string>
   */
  async getDownloadUrl(fileName: string, expiresIn?: number): Promise<string> {
    return this.fileUploadProvider.getDownloadUrl(fileName, expiresIn);
  }

  /**
   * Delete a file from storage
   * @param fileName - The name of the file to delete
   * @returns Promise<void>
   */
  async deleteFile(fileName: string): Promise<void> {
    return this.fileUploadProvider.delete(fileName);
  }
}
