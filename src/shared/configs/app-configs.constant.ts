import { ClassProvider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongoDbDuplicateKeyConstraintFilter } from 'core/exception-filters/mongo-db-duplicate-key-constraint.filter';
import { AccessTokenGuard } from 'core/guards/access-token.guard';

const globalAccessTokenGuard: ClassProvider<AccessTokenGuard> = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

const mongoDbDuplicateKeyConstraintFilter: ClassProvider<MongoDbDuplicateKeyConstraintFilter> =
  {
    provide: APP_FILTER,
    useClass: MongoDbDuplicateKeyConstraintFilter,
  };

export const guards = [globalAccessTokenGuard];

export const filters = [mongoDbDuplicateKeyConstraintFilter];
