import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RequestsLoggerService } from 'core/libs/logger/requests-logger.service';
import { map, Observable } from 'rxjs';
import { RequestI } from 'shared/interfaces/request.interface';
import {
  ResponseFromServiceClass,
  ResponseI,
} from 'shared/interfaces/response.interface';
import { requestMapper } from 'shared/utils/request-mapper.util';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor<Response, ResponseI>
{
  constructor(private readonly requestsLoggerService: RequestsLoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseI> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestI>();
    const now = Date.now();
    return next.handle().pipe(
      map((responseFromServiceClass: ResponseFromServiceClass) => {
        const response: ResponseI = {
          ...responseFromServiceClass,
          path: request.path,
          time: new Date().toUTCString(),
          requestDuration: Date.now() - now,
        };

        this.requestsLoggerService.logRequest(requestMapper(request), response);

        return response;
      }),
    );
  }
}
