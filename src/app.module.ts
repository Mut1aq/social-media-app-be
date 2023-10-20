import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  configOptions,
  i18nOptions,
  jwtOptions,
  mongooseOptions,
} from 'shared/configs/app-options.constant';
import { ModulesModule } from 'modules/modules.module';
import { JwtModule } from '@nestjs/jwt';
import {
  filters,
  guards,
  interceptors,
} from 'shared/configs/app-configs.constant';
import { CacheModule } from 'core/libs/cache/cache.module';
import { I18nModule } from 'nestjs-i18n';
import { LoggerModule } from 'core/libs/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    I18nModule.forRoot(i18nOptions),
    MongooseModule.forRootAsync(mongooseOptions),
    JwtModule.registerAsync(jwtOptions),
    CacheModule.register(),
    ModulesModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [...guards, ...filters, ...interceptors],
})
export class AppModule {}
