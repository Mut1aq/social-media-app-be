import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { I18nTranslations } from 'generated/i18n.generated';
import { IsNumbersIncluded } from 'modules/users/decorators/is-numbers-included.decorator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginUserDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString', {
      property: 'Credentials',
    }),
  })
  @MaxLength(320, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      property: 'Credentials',
      characters: 320,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      property: 'Credentials',
      characters: 3,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Credentials',
    }),
  })
  credentials!: string;

  @MaxLength(20, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      property: 'Password',
      characters: 20,
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsNumbersIncluded({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.passwordContains.number',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  password!: string;
}
