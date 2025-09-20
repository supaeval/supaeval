import { Module } from '@nestjs/common';
import { GcsProvider } from './providers/gcs.provider';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [GcsProvider, FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
