import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { RequestI } from 'shared/interfaces/request.interface';
import {
  ResponseFromServiceClassI,
  ResponseI,
} from 'shared/interfaces/response.interface';

@Injectable()
export class ResponseMappingInterceptor
  implements NestInterceptor<ResponseFromServiceClassI, ResponseI>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseFromServiceClassI>,
  ): Observable<ResponseI> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestI>();
    const finalResponse = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((responseFromServiceClass: ResponseFromServiceClassI) => {
        const response: ResponseI = {
          ...responseFromServiceClass,
          path: request.path,
        };
        finalResponse.status(responseFromServiceClass.statusCode);
        return response;
      }),
    );
  }
}
