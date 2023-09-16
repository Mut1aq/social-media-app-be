import { Controller, Post, Body, Req } from '@nestjs/common';
import { Public } from 'core/decorators/public.decorator';
import { Request } from 'express';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.registerUser(createUserDto);
    } catch (error) {
      console.log(error);

      return { message: 'an error occurred' };
    }
  }

  @Public()
  @Post('login')
  async logUserIn(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.logUserIn(loginUserDto);
    } catch (error) {
      console.log(error);

      return { message: 'an error occurred' };
    }
  }

  @Post('logout')
  async LogUserOut(@Req() req: Request & { user: { sub: string } }) {
    try {
      return this.authService.logUserOut(req.user.sub);
    } catch (error) {
      console.log(error);

      return { message: 'an error occurred' };
    }
  }
}
