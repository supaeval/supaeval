import { Injectable } from '@nestjs/common';
import {
  FileUploadProvider,
  SignedUploadUrl,
} from '../interfaces/file-upload.provider.interface';

@Injectable()
export class MockProvider implements FileUploadProvider {
  async signUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn: number = 3600,
  ): Promise<SignedUploadUrl> {
    // Mock implementation - just return a fake signed URL
    return {
      url: `https://mock-storage.com/upload/${fileName}`,
      fields: {},
      expiresIn,
    };
  }

  async getDownloadUrl(
    fileName: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    // Mock implementation - return the specified URL for all files
    return 'https://www.ecartegrise.fr/wp-content/uploads/2013/03/nouvelle-carte-grise-specimen.jpg';
  }

  async delete(fileName: string): Promise<void> {
    // Mock implementation - just log the deletion
    console.log(`Mock: Deleting file ${fileName}`);
  }
}
