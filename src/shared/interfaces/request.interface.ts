import { ParamsDictionary, Query, Request } from 'express-serve-static-core';
import { DecodedTokenI } from './tokens.interface';

export interface RequestI<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user: DecodedTokenI;
}
