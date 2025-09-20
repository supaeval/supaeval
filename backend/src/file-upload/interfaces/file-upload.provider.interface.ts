export interface SignedUploadUrl {
  url: string;
  fields: Record<string, string>;
  expiresIn: number; // seconds
}

export interface FileUploadProvider {
  /**
   * Generate a signed URL for uploading a file
   * @param fileName - The name of the file to upload
   * @param contentType - The MIME type of the file
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<SignedUploadUrl>
   */
  signUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<SignedUploadUrl>;

  /**
   * Generate a signed URL for downloading a file
   * @param fileName - The name of the file to download
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<string>
   */
  getDownloadUrl(fileName: string, expiresIn?: number): Promise<string>;

  /**
   * Delete a file from storage
   * @param fileName - The name of the file to delete
   * @returns Promise<void>
   */
  delete(fileName: string): Promise<void>;
}
