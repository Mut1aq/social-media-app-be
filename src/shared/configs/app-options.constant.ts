import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
import * as Joi from 'joi';
import { RedisClientOptions } from 'redis';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    DB_CONNECTION_STRING: Joi.string(),
  }),
};

export const mongooseOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL')!,
    retryAttempts: 10,
  }),
  inject: [ConfigService],
};

export const jwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
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
  imports: [ConfigModule],
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
