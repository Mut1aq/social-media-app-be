import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { filter } from 'nestjs-conditional-exception-filter';
import { MongoError, MongoServerError } from 'mongodb';
import { RequestI } from 'shared/interfaces/request.interface';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'generated/i18n.generated';

@Catch(
  filter({
    for: MongoError,
    when: (error) => error.code === 11000,
  }),
)
export class MongoDbDuplicateKeyConstraintFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestI>();
    const i18n = I18nContext.current<I18nTranslations>(host)!;

    const errorMessages = [];
    const { keyValue } = exception;
    for (const key in keyValue) {
      const errorMessage = i18n.translate('validation.uniqueProperty', {
        args: {
          property: key,
          value: keyValue[key],
        },
      });
      errorMessages.push(errorMessage);
    }

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: errorMessages.join(', '),
      request: request.path,
      time: new Date().toUTCString(),
    });
  }
}
