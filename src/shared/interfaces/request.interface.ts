import { Request } from 'express';
import { DecodedTokenI } from './tokens.interface';

export interface RequestI extends Request {
  user: DecodedTokenI;
}
