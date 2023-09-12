import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseFeature } from './entities/user.entity';
import { IsUserPropertyExistsValidator } from './decorators/is-user-property-exists.decorator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUserPropertyExistsValidator],
  imports: [MongooseModule.forFeature([userMongooseFeature])],
  exports: [UsersService],
})
export class UsersModule {}
