import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsAlwaysTrue(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isAlwaysTrue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        validate(value: any) {
          return value === true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be true`;
        },
      },
    });
  };
}
