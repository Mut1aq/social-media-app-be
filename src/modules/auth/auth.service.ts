import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'core/libs/cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
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
    const accessTokenFromCache = await this.cacheService.getField(
      user._id.toString(),
      'accessToken',
    );

    if (!!accessTokenFromCache) return { accessToken: accessTokenFromCache };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
      expiresIn: this.configService.get<string>(
        'USER_ACCESS_TOKEN_EXPIRES_IN',
      )!,
    });

    await this.cacheService.setObject(
      user._id.toString(),
      { accessToken },
      86400,
    );

    return { accessToken };
  }
}
