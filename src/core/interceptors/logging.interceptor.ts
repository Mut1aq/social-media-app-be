import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RequestsLoggerService } from 'core/libs/logger/requests-logger.service';
import { map, Observable } from 'rxjs';
import { RequestI } from 'shared/interfaces/request.interface';
import { ResponseI } from 'shared/interfaces/response.interface';
import { requestMapper } from 'shared/utils/request-mapper.util';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor<ResponseI, ResponseI>
{
  constructor(private readonly requestsLoggerService: RequestsLoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseI>,
  ): Observable<ResponseI> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestI>();
    const now = Date.now();
    return next.handle().pipe(
      map((response: ResponseI) => {
        response.time = new Date().toUTCString();
        response.requestDuration = Date.now() - now;

        this.requestsLoggerService.logRequest(requestMapper(request), response);

        return response;
      }),
    );
  }
}
