export interface FileUploadProvider {
  uploadFile(
    file: File,
    signedUrl: string,
    fields: Record<string, string>,
  ): Promise<{ success: boolean; storageKey: string; error?: string }>;
}

export class MockFileUploadProvider implements FileUploadProvider {
  async uploadFile(
    file: File,
    signedUrl: string,
    fields: Record<string, string>,
  ): Promise<{ success: boolean; storageKey: string; error?: string }> {
    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock storage key based on the file name and timestamp
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop() || "bin";
      const mockStorageKey = `files/my-file-key-${timestamp}.${fileExtension}`;

      // In a real implementation, this would upload to the actual storage service
      // For now, we just simulate success and return the mock storage key
      console.log("Mock upload completed:", {
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type,
        signedUrl,
        fields,
        mockStorageKey,
      });

      return {
        success: true,
        storageKey: mockStorageKey,
      };
    } catch (error) {
      console.error("Mock upload failed:", error);
      return {
        success: false,
        storageKey: "",
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }
}
