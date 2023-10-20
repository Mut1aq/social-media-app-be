import { HttpStatus } from '@nestjs/common';

export interface ResponseFromServiceClass<T = any> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export interface ResponseFromLoggingInterceptorI {
  path: string;
  time: string;
  requestDuration: number;
}

export type ResponseI = ResponseFromServiceClass &
  ResponseFromLoggingInterceptorI;
