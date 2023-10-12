import { Module } from '@nestjs/common';
import { FileWriterModule } from '../file-writer/file-writer.module';
import { ExceptionsLoggerService } from './exceptions-logger.service';
import { LoggerListener } from './logger.listener';

@Module({
  providers: [ExceptionsLoggerService],
  exports: [ExceptionsLoggerService],
  imports: [FileWriterModule],
})
export class LoggerModule extends LoggerListener {}
