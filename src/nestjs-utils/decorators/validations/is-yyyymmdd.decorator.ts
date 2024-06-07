import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsYYYYMMDD(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isYYYYMMDD',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        validate(value: any) {
          return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return `${validationArguments.property} must be a valid date format (YYYY-MM-DD)`;
        },
      },
    });
  };
}
