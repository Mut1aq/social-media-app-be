import { Module } from '@nestjs/common';
import { FileWriterModule } from '../file-writer/file-writer.module';
import { ExceptionsLoggerService } from './exceptions-logger.service';
import { LoggerListener } from './logger.listener';
import { LoggerService } from './logger.service';

@Module({
  providers: [ExceptionsLoggerService, LoggerService],
  exports: [ExceptionsLoggerService, LoggerService],
  imports: [FileWriterModule],
})
export class LoggerModule extends LoggerListener {}
