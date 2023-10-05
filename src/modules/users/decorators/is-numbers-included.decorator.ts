import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { stringNumbers } from 'shared/constants/validation-helpers.constant';

@ValidatorConstraint({ name: 'IsNumbersIncluded' })
export class IsNumbersIncludedValidator
  implements ValidatorConstraintInterface
{
  validate(
    value: string,
    _validationArguments?: ValidationArguments | undefined,
  ): boolean {
    return stringNumbers.some((stringNumber) => value?.includes(stringNumber));
  }
  defaultMessage(
    _validationArguments?: ValidationArguments | undefined,
  ): string {
    return `Numbers weren't included`;
  }
}

export function IsNumbersIncluded(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      validator: IsNumbersIncludedValidator,
      options: validationOptions!,
    });
  };
}
