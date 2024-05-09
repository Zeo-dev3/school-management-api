import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';
import { ValidationError } from './validation-error';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.zodType.parse(value);
      return value;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((error) => error.message);
        throw new ValidationError(errorMessages);
      }
      throw err;
    }
  }
}
