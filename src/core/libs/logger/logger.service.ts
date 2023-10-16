import {
  Injectable,
  LoggerService as NestJSLoggerService,
  LogLevel,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  dateColor,
  errorColor,
  logColor,
  warnColor,
} from 'shared/constants/logger-colors.constant';
import { LoggerColorI } from 'shared/interfaces/logger-color.interface';
import { formattedDateForConsole } from 'shared/utils/date.util';

@Injectable()
export class LoggerService implements NestJSLoggerService {
  constructor(private readonly configService: ConfigService) {}
  log(message: any, context: string) {
    console.log(this.formatLogMessage(message, 'log', logColor, context));
  }

  error(message: any, context: string) {
    console.log(this.formatLogMessage(message, 'error', errorColor, context));
  }

  warn(message: any, context: string) {
    console.log(this.formatLogMessage(message, 'warn', warnColor, context));
  }

  formatLogMessage(
    message: string,
    logLevel: LogLevel,
    loggerColor: LoggerColorI,
    context: string,
  ) {
    const { contextColor, messageColor } = loggerColor;

    const formattedLogMessage = `${messageColor}[${this.configService.get<string>(
      'APP_NAME',
    )}] ${messageColor}${
      process.pid
    } - ${dateColor}${formattedDateForConsole()}  ${messageColor}${logLevel.toUpperCase()} ${contextColor}[${context}] ${messageColor}${message}`;

    return formattedLogMessage;
  }
}
