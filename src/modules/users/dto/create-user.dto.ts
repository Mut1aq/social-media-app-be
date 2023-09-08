import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsUserPropertyExists } from '../decorators/is-user-property-exists.decorator';

export class CreateUserDto {
  @MaxLength(320)
  @MinLength(3)
  @IsUserPropertyExists('email', {
    message: 'the email is already taken',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password!: string;
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  confirmPassword!: string;

  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsUserPropertyExists('username', {
    message: 'the username is already taken',
  })
  @IsNotEmpty()
  username!: string;
}
