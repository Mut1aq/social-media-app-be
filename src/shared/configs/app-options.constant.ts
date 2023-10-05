import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
import * as Joi from 'joi';
import {
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { I18nOptions } from 'nestjs-i18n/dist/interfaces';
import { join } from 'path';
import { RedisClientOptions } from 'redis';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    DB_CONNECTION_STRING: Joi.string(),
  }),
};

export const mongooseOptions: MongooseModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL')!,
    retryAttempts: 10,
  }),
  inject: [ConfigService],
};

export const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
    signOptions: {
      expiresIn: configService.get<string>('USER_ACCESS_TOKEN_EXPIRES_IN')!,
    },
    global: true,
  }),
  inject: [ConfigService],
};

export const redisOptions: CacheModuleAsyncOptions<RedisClientOptions> = {
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    socket: {
      host: configService.get<string>('REDIS_HOST')!,
      port: configService.get<string>('REDIS_PORT')!,
      tls: false,
    },
  }),
  inject: [ConfigService],
  isGlobal: true,
};

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../../resources/i18n'),
    watch: true,
  },
  typesOutputPath: join(`${process.cwd()}/src/generated/i18n.generated.ts`),
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
  ],
};
