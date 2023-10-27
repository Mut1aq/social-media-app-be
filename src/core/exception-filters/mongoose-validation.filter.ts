import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
import { Response } from 'express';
import { RequestI } from 'shared/interfaces/request.interface';
import { I18nTranslations } from 'generated/i18n.generated';
import { I18nContext } from 'nestjs-i18n';
import { ExceptionsLoggerService } from 'core/libs/logger/exceptions-logger.service';
import { ExceptionI } from 'shared/interfaces/exception.interface';
import { requestMapper } from 'shared/utils/request-mapper.util';
import { MongooseValidationError } from 'shared/interfaces/mongoose-validation-error.interface';

@Catch(ValidationError)
export class MongooseValidationFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionsLoggerService: ExceptionsLoggerService,
  ) {}
  catch(exception: MongooseValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestI>();
    try {
      const i18n = I18nContext.current<I18nTranslations>(host)!;

      const violatedProperties = exception.errors;
      const errorMessages = [];

      for (const property in violatedProperties) {
        const propertyObject = violatedProperties[property];

        const { kind, message } = propertyObject;
        let errorMessage = '';
        switch (kind) {
          case 'required':
            errorMessage = i18n.translate('validation.isNotEmpty', {
              args: {
                property,
              },
            });
            errorMessages.push(errorMessage);
            break;

          case 'minlength':
            errorMessage = i18n.translate('validation.minLength', {
              args: {
                property,
                characters: propertyObject.properties.minlength,
              },
            });
            errorMessages.push(errorMessage);
            break;

          case 'maxlength':
            errorMessage = i18n.translate('validation.maxLength', {
              args: {
                property,
                characters: propertyObject.properties.maxlength,
              },
            });
            errorMessages.push(errorMessage);
            break;

          case 'max':
            errorMessage = i18n.translate('validation.max', {
              args: {
                property,
                max: propertyObject.properties.max,
              },
            });
            errorMessages.push(errorMessage);
            break;

          case 'min':
            errorMessage = i18n.translate('validation.min', {
              args: {
                property,
                min: propertyObject.properties.min,
              },
            });
            errorMessages.push(errorMessage);
            break;

          default:
            errorMessage = message;
            errorMessages.push(errorMessage);

            break;
        }
      }

      const exceptionBody: ExceptionI = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessages.join(', '),
        request: requestMapper(request),
        time: new Date().toUTCString(),
      };

      this.exceptionsLoggerService.logException(exceptionBody);

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessages.join(', '),
        request: request.path,
        time: new Date().toUTCString(),
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error, fire your backend developer',
        request: request.path,
        time: new Date().toUTCString(),
      });
    }
  }
}
