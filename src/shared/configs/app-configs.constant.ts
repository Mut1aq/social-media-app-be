import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'core/guards/access-token.guard';

const globalAccessTokenGuard = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

export const guards = [globalAccessTokenGuard];
