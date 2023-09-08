import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  async registerUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}
