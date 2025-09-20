"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  className?: string;
  showUploadButton?: boolean;
  onAddToDataset?: (files: File[]) => Promise<void>;
}

interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  error?: string;
}

interface SelectedFile {
  file: File;
  preview: string;
}

export const ImageUpload = ({
  onUpload,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp"],
  className,
  showUploadButton = false,
  onAddToDataset,
}: ImageUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    // Create preview URLs for selected files
    const newFiles: SelectedFile[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": acceptedFileTypes,
    },
    maxFiles,
    maxSize,
    multiple: true,
  });

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      const removedFile = newFiles[index];
      URL.revokeObjectURL(removedFile.preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      const removedFile = newFiles[index];
      URL.revokeObjectURL(removedFile.preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const clearSelectedFiles = () => {
    selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    setSelectedFiles([]);
  };

  const clearUploadedFiles = () => {
    uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
  };

  const handleFilesUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      // Convert selected files to File array
      const files = selectedFiles.map((selectedFile) => selectedFile.file);

      // Call the onAddToDataset callback if provided
      if (onAddToDataset) {
        await onAddToDataset(files);
      } else {
        // Fallback to the original onUpload callback
        await onUpload(files);
      }

      // Move files from selected to uploaded
      const newUploadedFiles: UploadedFile[] = selectedFiles.map(
        (selectedFile) => ({
          file: selectedFile.file,
          preview: selectedFile.preview,
          uploading: false,
        }),
      );

      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error - could show error state for individual files
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          isUploading && "pointer-events-none opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400" />
          )}
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragActive
                ? "Drop images here"
                : "Drag & drop images here, or click to select"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPEG, PNG, WebP up to {Math.round(maxSize / 1024 / 1024)}
              MB
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maximum {maxFiles} files
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Selected Files ({selectedFiles.length})
            </h3>
            <button
              onClick={clearSelectedFiles}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {selectedFiles.map((selectedFile, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden bg-gray-50"
              >
                <div className="aspect-square relative">
                  <img
                    src={selectedFile.preview}
                    alt={selectedFile.file.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeSelectedFile(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-2">
                  <p
                    className="text-xs text-gray-600 truncate"
                    title={selectedFile.file.name}
                  >
                    {selectedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>

          {showUploadButton && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleFilesUpload}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upload ({selectedFiles.length} files)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <button
              onClick={clearUploadedFiles}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {uploadedFiles.map((uploadedFile, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden bg-gray-50"
              >
                <div className="aspect-square relative">
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Upload Status Overlay */}
                  {uploadedFile.uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}

                  {uploadedFile.error && (
                    <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex items-center justify-center">
                      <X className="h-6 w-6 text-white" />
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeUploadedFile(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-2">
                  <p
                    className="text-xs text-gray-600 truncate"
                    title={uploadedFile.file.name}
                  >
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadedFile.error && (
                    <p
                      className="text-xs text-red-600 truncate"
                      title={uploadedFile.error}
                    >
                      {uploadedFile.error}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
