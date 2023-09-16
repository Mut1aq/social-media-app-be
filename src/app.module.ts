import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  configOptions,
  jwtOptions,
  mongooseOptions,
} from 'shared/configs/app-options.constant';
import { ModulesModule } from 'modules/modules.module';
import { JwtModule } from '@nestjs/jwt';
import { guards } from 'shared/configs/app-configs.constant';
import { CacheModule } from 'core/libs/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseOptions),
    JwtModule.registerAsync(jwtOptions),
    CacheModule.register(),
    ModulesModule,
  ],
  controllers: [],
  providers: [...guards],
})
export class AppModule {}
