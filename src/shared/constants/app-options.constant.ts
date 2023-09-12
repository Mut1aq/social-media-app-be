import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import * as Joi from 'joi';

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
