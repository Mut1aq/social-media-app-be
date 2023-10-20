import { DynamicObjectI } from './dynamic-object.interface';
import { RequestMethod } from '@nestjs/common';
export interface LoggedRequestI {
  path: string;
  body: DynamicObjectI;
  queryParams: DynamicObjectI;
  routeParams: DynamicObjectI;
  token?: string;
  lang: string;
  method: RequestMethod;
}
