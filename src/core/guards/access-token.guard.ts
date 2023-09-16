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
    try {
      {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        if (!authorization || Array.isArray(authorization)) {
          throw new HttpException(
            'Invalid Auth Header',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }

        const [_, token] = authorization.split(' ');

        const decodedToken = this.jwtService.verify(token, {
          secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
        });

        if (!decodedToken) {
          throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
        }
        const userFromCache = await this.cacheService.getField(
          decodedToken.sub,
          'accessToken',
        );
        if (!!userFromCache) {
          request.user = decodedToken;
          return true;
        }
        throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
  }
}
