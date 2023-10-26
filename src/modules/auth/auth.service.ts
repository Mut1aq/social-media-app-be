import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'core/libs/cache/cache.service';
import { TokenPayloadI } from 'shared/interfaces/tokens.interface';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'generated/i18n.generated';
import { ResponseFromServiceClassI } from 'shared/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseFromServiceClassI<string>> {
    const { password, email } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);
    await this.usersService.create(createUserDto);
    const responseFromServiceClass = await this.logUserIn({
      credentials: email,
      password,
    });
    return {
      ...responseFromServiceClass,
      statusCode: HttpStatus.CREATED,
      message: 'Register successful',
    };
  }

  async logUserIn(
    loginUserDto: LoginUserDto,
  ): Promise<ResponseFromServiceClassI<string>> {
    const { credentials, password } = loginUserDto;

    const user = await this.usersService.findUserByCredentials(credentials);
    if (!user) {
      throw new HttpException(
        this.i18n.translate('auth.errors.wrongCredentials'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user!.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        this.i18n.translate('auth.errors.wrongCredentials'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokenPayload: TokenPayloadI = {
      sub: user._id,
    };
    const accessTokenFromCache = await this.cacheService.getField(
      user._id.toString(),
      'accessToken',
    );

    if (!!accessTokenFromCache)
      return {
        data: accessTokenFromCache,
        message: 'login successful',
        statusCode: HttpStatus.OK,
      };
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

    return {
      data: accessToken,
      message: 'login successful',
      statusCode: HttpStatus.OK,
    };
  }
}
