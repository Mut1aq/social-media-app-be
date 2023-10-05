import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as NestJSCacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisOptions } from 'shared/configs/app-options.constant';
import { DynamicModule } from '@nestjs/common/interfaces';
import { Global } from '@nestjs/common/decorators';

@Global()
@Module({})
export class CacheModule {
  static register(): DynamicModule {
    const providers = [CacheService];
    const imports = [
      NestJSCacheModule.registerAsync<RedisClientOptions>(redisOptions),
    ];

    return {
      providers,
      imports,
      exports: [CacheService],
      module: CacheModule,
    };
  }
}
