import { Injectable } from '@nestjs/common';
import { LoggedRequestI } from 'shared/interfaces/logged-request.interface';
import { ResponseI } from 'shared/interfaces/response.interface';
import { RequestsFileWriterService } from '../file-writer/requests-file-writer.service';

@Injectable()
export class RequestsLoggerService {
  constructor(
    private readonly requestsFileWriterService: RequestsFileWriterService,
  ) {}

  logRequest(request: LoggedRequestI, response: ResponseI) {
    return this.requestsFileWriterService.writeToRequestsLogFile({
      request,
      response,
    });
  }
}
