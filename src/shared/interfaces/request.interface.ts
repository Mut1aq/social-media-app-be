import { Request } from 'express-serve-static-core';
import { DecodedTokenI } from './tokens.interface';

export interface RequestI extends Request {
  user: DecodedTokenI;
}
