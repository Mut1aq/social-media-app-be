import { DynamicObjectI } from './dynamic-object.interface';

export interface LoggedRequestI {
  path: string;
  body: DynamicObjectI;
  queryParams: DynamicObjectI;
  routeParams: DynamicObjectI;
  token?: string;
  lang: string;
}
