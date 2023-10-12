import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { I18nTranslations } from 'generated/i18n.generated';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsNumbersIncluded } from '../decorators/is-numbers-included.decorator';
import { MatchTwoProperties } from '../decorators/match-two-properties.decorator';

export class CreateUserDto {
  @MaxLength(320, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      property: 'Email',
      characters: 320,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      property: 'Email',
      characters: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString', {
      property: 'Email',
    }),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage<I18nTranslations>('validation.email', {
      property: 'Email',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  email!: string;

  @MatchTwoProperties('confirmPassword')
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

  @MaxLength(20, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      property: 'Confirm Password',
      characters: 20,
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      property: 'Confirm Password',
      characters: 8,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString', {
      property: 'Confirm Password',
    }),
  })
  @IsNumbersIncluded({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.confirmPasswordContains.number',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Confirm Password',
    }),
  })
  confirmPassword!: string;

  @MaxLength(30, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      property: 'Username',
      characters: 30,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      property: 'Username',
      characters: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString', {
      property: 'Username',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Username',
    }),
  })
  username!: string;
}
