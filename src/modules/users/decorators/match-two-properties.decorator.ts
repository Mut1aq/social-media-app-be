import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DynamicObjectI } from 'shared/interfaces/dynamic-object.interface';

@ValidatorConstraint({ async: false, name: 'MatchTwoProperties' })
export class MatchTwoPropertiesValidator
  implements ValidatorConstraintInterface
{
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    const [property] = validationArguments?.constraints!;
    const dtoObject = validationArguments?.object as DynamicObjectI;

    return dtoObject[property] === value;
  }
  defaultMessage(
    _validationArguments?: ValidationArguments | undefined,
  ): string {
    return `passwords don't match`;
  }
}

export function MatchTwoProperties(property: string) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      validator: MatchTwoPropertiesValidator,
      constraints: [property],
    });
  };
}
