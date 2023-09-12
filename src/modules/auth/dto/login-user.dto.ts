import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { IsNumbersIncluded } from 'modules/users/decorators/is-numbers-included.decorator';

export class LoginUserDto {
  @IsString()
  @MaxLength(320)
  @MinLength(3)
  @IsNotEmpty()
  credentials!: string;

  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNumbersIncluded()
  @IsNotEmpty()
  password!: string;
}
