import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  configOptions,
  mongooseOptions,
} from 'shared/constants/app-options.constant';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
