import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private field: string = 'body',
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== this.field) {
        return value;
      }

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
