import { LoggedRequestI } from './logged-request.interface';
import { ResponseI } from './response.interface';

export interface RequestsFileEntryI {
  request: LoggedRequestI;
  response: ResponseI;
}
