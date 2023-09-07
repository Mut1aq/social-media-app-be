import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
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
    dbName: 'socialMediaDevDB',
  }),
  inject: [ConfigService],
};
