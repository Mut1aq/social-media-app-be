import { Module } from '@nestjs/common';
import { ExceptionsFileWriterService } from './exceptions-file-writer.service';

@Module({
  providers: [ExceptionsFileWriterService],
  exports: [ExceptionsFileWriterService],
})
export class FileWriterModule {}
