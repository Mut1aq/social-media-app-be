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

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
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
        request.user = decodedToken;
        return true;
      }
    } catch (error) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
  }
}
