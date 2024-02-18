import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Validation failed',
          errors: error.errors.map((e: any) => ({
            path: e.path.join('.'),
            message: e.message,
            errorCode: e.code,
          })),
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
