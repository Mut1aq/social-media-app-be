import { ClassProvider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongoDbDuplicateKeyConstraintFilter } from 'core/exception-filters/mongo-db-duplicate-key-constraint.filter';
import { AccessTokenGuard } from 'core/guards/access-token.guard';
import { LoggingInterceptor } from 'core/interceptors/logging.interceptor';
import { ResponseMappingInterceptor } from 'core/interceptors/response-mapping.interceptor';

const globalAccessTokenGuard: ClassProvider<AccessTokenGuard> = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

const mongoDbDuplicateKeyConstraintFilter: ClassProvider<MongoDbDuplicateKeyConstraintFilter> =
  {
    provide: APP_FILTER,
    useClass: MongoDbDuplicateKeyConstraintFilter,
  };

const globalLoggingInterceptor: ClassProvider<LoggingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

const globalResponseMappingInterceptor: ClassProvider<ResponseMappingInterceptor> =
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseMappingInterceptor,
  };

export const guards = [globalAccessTokenGuard];

export const filters = [mongoDbDuplicateKeyConstraintFilter];

export const interceptors = [
  globalLoggingInterceptor,
  globalResponseMappingInterceptor,
];
