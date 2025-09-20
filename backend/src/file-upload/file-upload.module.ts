import { Module } from '@nestjs/common';
import { GcsProvider } from './providers/gcs.provider';
import { MockProvider } from './providers/mock.provider';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [GcsProvider, MockProvider, FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
