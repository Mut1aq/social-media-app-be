import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'core/decorators/public.decorator';
import { CacheService } from 'core/libs/cache/cache.service';
import { I18nTranslations } from 'generated/i18n.generated';
import { I18nContext } from 'nestjs-i18n';
import { DecodedToken } from 'shared/interfaces/tokens.interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const i18n = I18nContext.current<I18nTranslations>(context)!;
    try {
      {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        if (!authorization || Array.isArray(authorization)) {
          throw new HttpException(
            i18n.translate('auth.errors.loginFirst'),
            HttpStatus.BAD_REQUEST,
          );
        }

        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer')
          throw new HttpException(
            i18n.translate('auth.errors.loginFirst'),
            HttpStatus.BAD_REQUEST,
          );

        const decodedToken = this.jwtService.verify<DecodedToken>(token, {
          secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
        });

        if (!decodedToken) {
          throw new HttpException(
            i18n.translate('auth.errors.unauthorized'),
            HttpStatus.UNAUTHORIZED,
          );
        }
        const accessTokenFromCache = await this.cacheService.getField(
          decodedToken.sub,
          'accessToken',
        );
        if (!!accessTokenFromCache) {
          request.user = decodedToken;
          return true;
        }
        throw new HttpException(
          i18n.translate('auth.errors.unauthorized'),
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error: any) {
      throw new HttpException(
        !!error.message
          ? error.message
          : i18n.translate('auth.errors.unauthorized'),
        !!error.status ? error.status : HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
