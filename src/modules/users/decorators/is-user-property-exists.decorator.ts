import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'IsUserPropertyExists', async: true })
@Injectable()
export class IsUserPropertyExistsValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [property] = validationArguments?.constraints!;

    const user = await this.usersService.findUserByProperty(property, value);

    if (!user) {
      return true;
    }
    return false;
  }
}

export function IsUserPropertyExists(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsUserPropertyExistsValidator,
      constraints: [property],
    });
  };
}
