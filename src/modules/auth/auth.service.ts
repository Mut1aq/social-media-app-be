import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  async logUserIn(loginUserDto: LoginUserDto) {
    const { credentials, password } = loginUserDto;

    const user = await this.usersService.findUserByCredentials(credentials);
    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user!.password);

    if (!isPasswordCorrect) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const tokenPayload = {
      sub: user._id,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
      expiresIn: this.configService.get<string>(
        'USER_ACCESS_TOKEN_EXPIRES_IN',
      )!,
    });

    return { accessToken };
  }
}
