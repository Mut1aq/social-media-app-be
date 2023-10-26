import { HttpStatus } from '@nestjs/common';

export interface ResponseFromServiceClassI<T = unknown> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export interface ResponseFromLoggingInterceptorI {
  path: string;
  time?: string;
  requestDuration?: number;
}

export type ResponseI = ResponseFromServiceClassI &
  ResponseFromLoggingInterceptorI;
