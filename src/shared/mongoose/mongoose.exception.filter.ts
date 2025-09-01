import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';

@Catch(MongooseError, MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);
    if (exception instanceof MongooseError.ValidationError) {
      const errors = Object.values(exception.errors).map((e: any) => e.message);
      return response.status(400).json({
        statusCode: 400,
        error: 'Validation Error',
        message: errors,
      });
    }

    if (exception instanceof MongooseError.CastError) {
      return response.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: `Invalid ${exception.path}: ${exception.value}`,
      });
    }

    if (exception.code === 11000) {
      return response.status(409).json({
        statusCode: 409,
        error: 'Conflict',
        message: `Key must be unique: ${JSON.stringify(exception.keyValue)}`,
      });
    }

    throw new InternalServerErrorException(exception.message);
  }
}
